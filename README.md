# ZeaMays-Yield-Prediction-Benin

Système de prédiction du rendement du maïs (*Zea mays*) au Bénin basé sur 
l'apprentissage automatique, conçu comme outil d'aide à la décision agricole.

**Mémoire de Licence en Informatique — Option Intelligence Artificielle**  
Institut de Formation et de Recherche en Informatique (IFRI) — UAC  
Auteure : TADOGBE Trésor Steffi  
Encadreure : Ing. HODONOU Consolas  
Année académique : 2025-2026

---

## Objectif du projet

Développer un système de prédiction du rendement du maïs à deux niveaux de 
granularité spatiale (départemental et communal) au Bénin, en comparant 
plusieurs algorithmes de machine learning (régression linéaire, Random Forest, 
XGBoost), et déployer le meilleur modèle dans une interface web d'aide à la 
décision agricole.

**Meilleur modèle** : Random Forest (top 30 features) — R² = 0,59 — RMSE = 0,21 t/ha

---

## Prérequis d'installation

- Python 3.11 ou plus récent
- Activer l'environnement virtuel puis installer les dépendances :

```bash
pip install -r requirements.txt
```

---

## Lancer l'interface web

```bash
cd app
python app.py
```

Ouvrir ensuite `http://127.0.0.1:5000` dans le navigateur.

---

## Structure du projet


ZeaMays-Yield-Prediction-Benin/
│
├── README.md                          # Documentation générale du projet
├── requirements.txt                   # Dépendances Python
├── .gitignore                         # Fichiers exclus du contrôle de version
│
├── data/
│   ├── raw/                           # Données brutes originales (non modifiées)
│   │   ├── rendement_communale.xlsx   # Rendements par commune (DSA Bénin)
│   │   ├── rendement_départementale.xlsx
│   │   ├── FAOSTAT_data_fr_6-1-2026.csv
│   │   ├── climat_nasa/               # Données NASA POWER par département
│   │   ├── climat_nasa_communal/      # Données NASA POWER par commune
│   │   ├── limites/                   # Shapefile limites communales (IGN Bénin)
│   │   └── pedologie/                 # Shapefile types de sols du Bénin
│   ├── processed/                     # Données nettoyées et prêtes à l'emploi
│   │   ├── dataset_final.csv          # Dataset départemental (220 obs, 83 col)
│   │   ├── dataset_enrichi.csv        # Dataset départemental enrichi (220 obs, 114 col)
│   │   ├── dataset_communal.csv       # Dataset communal enrichi (1515 obs, 117 col)
│   │   ├── climat_annuel.csv
│   │   └── moyenne_rendement_commune.csv
│   └── metadata/                      # Documentation des sources de données
│       ├── sources.md
│       ├── dictionnaire_variables.md
│       ├── encodage_departements.md
│       └── coordonnees_communes.csv
│
├── notebooks/
│   ├── 00_test_environnement.ipynb        # ✅ Test des imports et librairies
│   ├── 00b_download_nasa_power.ipynb      # ✅ Téléchargement NASA POWER départemental
│   ├── 00c_download_communal.ipynb        # ✅ Pipeline données communales + pédologie
│   ├── 01_exploratory_data_analysis.ipynb # ✅ EDA et visualisations
│   ├── 02_preprocessing.ipynb             # ✅ Nettoyage et fusion des données
│   ├── 03_feature_engineering.ipynb       # ✅ Construction des variables
│   ├── 04_model_training.ipynb            # ✅ Entraînement modèles départementaux
│   ├── 04b_model_training_communal.ipynb  # ✅ Entraînement modèles communaux
│   ├── 05_model_evaluation.ipynb          # ✅ Évaluation et comparaison
│   └── comparaison_fao_rendement.ipynb    # ✅ Validation croisée FAO vs DSA
│
├── models/
│   ├── trained_models/                # Modèles sérialisés (.joblib)
│   │   ├── random_forest.joblib       # Meilleur modèle départemental
│   │   ├── random_forest_communal.joblib
│   │   ├── top_features.joblib
│   │   └── top_features_communal.joblib
│   ├── model_evaluation/              # Rapports et métriques de performance
│   └── hyperparameters/               # Configurations des hyperparamètres
│
├── app/                               # Interface web Flask
│   ├── templates/
│   │   └── index.html
│   ├── static/
│   │   ├── style.css
│   │   ├── script.js
│   │   └── favicon.svg
│   └── app.py                         # Point d'entrée de l'application
│
└── reports/
├── figures/                       # Graphiques et visualisations générés
├── tables/                        # Tableaux de résultats
├── analysis_report.md             # Synthèse narrative de l'EDA
└── rapport_evaluation.md          # Rapport d'évaluation des modèles

---

## Résumé du travail réalisé

### Niveau départemental (11 départements, 2003-2022)

| Notebook | Description | Résultat |
|---|---|---|
| `00b_download_nasa_power` | Téléchargement NASA POWER via API | 11 fichiers CSV climatiques |
| `02_preprocessing` | Fusion rendement + climat, correction unités | `dataset_final.csv` (220 obs, 83 col) |
| `03_feature_engineering` | 31 nouvelles variables construites | `dataset_enrichi.csv` (220 obs, 114 col) |
| `04_model_training` | 7 configurations comparées | Random Forest top 30 : R²=0,59, RMSE=0,21 t/ha |
| `05_model_evaluation` | Analyse résidus, visualisations | Biais moyen : -0,021 t/ha |

### Niveau communal (76 communes, 2003-2022)

| Notebook | Description | Résultat |
|---|---|---|
| `00c_download_communal` | NASA POWER 77 communes + type de sol | `dataset_communal.csv` (1515 obs, 117 col) |
| `04b_model_training_communal` | 10 configurations comparées | Random Forest + commune : R²=0,38, RMSE=0,32 t/ha |

### Validation croisée

Écart moyen DSA Bénin vs FAOSTAT : **4,5%** sur la période 2003-2022.

### Interface web

Application Flask déployée localement permettant à un agent de terrain de 
saisir département, qualité des pluies et année pour obtenir une estimation 
du rendement avec historique des prédictions.

---

## Sources de données

| Source | Type | URL |
|---|---|---|
| DSA Bénin / Open Data Bénin | Rendements agricoles | https://benin.opendataforafrica.org/qnewqoe |
| NASA POWER | Données climatiques mensuelles | https://power.larc.nasa.gov |
| FAOSTAT | Validation croisée nationale | https://www.fao.org/faostat |
| IGN Bénin | Limites communales (shapefile) | Données reçues en stage |
| Pédologie Bénin | Types de sols (shapefile) | Données reçues en stage |