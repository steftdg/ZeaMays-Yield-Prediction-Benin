from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import joblib
import os

app = Flask(__name__)

# Chargement du modèle et des données au démarrage
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

modele = joblib.load(os.path.join(BASE_DIR, "../models/trained_models/random_forest.joblib"))
top_features = joblib.load(os.path.join(BASE_DIR, "../models/trained_models/top_features.joblib"))
dataset = pd.read_csv(os.path.join(BASE_DIR, "../data/processed/dataset_enrichi.csv"))

# Calculer les moyennes historiques par département
moyennes = dataset.groupby("departement")[top_features].mean()

# Moyennes de rendement historique par département pour l'interprétation
rendement_moyen = dataset.groupby("departement")["rendement_t_ha"].mean()

DEPARTEMENTS = sorted(dataset["departement"].unique().tolist())

QUALITE_PLUIE = {
    "Très mauvaise": 0.6,
    "Mauvaise":      0.8,
    "Normale":       1.0,
    "Bonne":         1.2,
    "Très bonne":    1.4,
}

@app.route("/")
def index():
    return render_template("index.html", departements=DEPARTEMENTS)

@app.route("/predire", methods=["POST"])
def predire():
    try:
        data = request.get_json()
        departement  = data["departement"]
        qualite_pluie = data["qualite_pluie"]
        annee        = int(data["annee"])

        # Récupérer les moyennes historiques du département
        valeurs = moyennes.loc[departement].copy()

        # Ajuster les précipitations selon la qualité des pluies
        facteur = QUALITE_PLUIE[qualite_pluie]
        cols_precip = [c for c in top_features if "precip" in c]
        for col in cols_precip:
            valeurs[col] *= facteur

        # Mettre à jour l'année
        if "annee" in top_features:
            valeurs["annee"] = annee
        if "annee_normalisee" in top_features:
            valeurs["annee_normalisee"] = (annee - 2003) / (2022 - 2003)

        # Prédiction
        X_pred = pd.DataFrame([valeurs])[top_features]
        rendement_predit = float(modele.predict(X_pred)[0])

        # Interprétation
        moy_dept = float(rendement_moyen[departement])
        ecart = ((rendement_predit - moy_dept) / moy_dept) * 100

        if rendement_predit < moy_dept * 0.85:
            niveau = "Faible"
            couleur = "#e74c3c"
            conseil = "Risque de faible rendement. Envisagez des mesures compensatoires : irrigation d'appoint, variétés résistantes à la sécheresse."
        elif rendement_predit < moy_dept * 1.10:
            niveau = "Normal"
            couleur = "#f39c12"
            conseil = "Rendement dans la normale historique. Maintenez vos pratiques habituelles et assurez une fertilisation adéquate."
        else:
            niveau = "Bon"
            couleur = "#27ae60"
            conseil = "Conditions favorables. Profitez de cette bonne saison pour optimiser vos intrants et maximiser la production."

        return jsonify({
            "succes": True,
            "rendement": round(rendement_predit, 3),
            "niveau": niveau,
            "couleur": couleur,
            "conseil": conseil,
            "moyenne_historique": round(moy_dept, 3),
            "ecart_pct": round(ecart, 1),
        })

    except Exception as e:
        return jsonify({"succes": False, "erreur": str(e)})

if __name__ == "__main__":
    app.run(debug=True)