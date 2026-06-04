# ZeaMays-Yield-Prediction-Benin
Système de prédiction du rendement du maïs (Zea mays) au Bénin basé sur l’apprentissage automatique, conçu comme outil d’aide à la décision pour l’agriculture.

Mémoire de Licence en Informatique — Option Intelligence Artificielle  
Institut de Formation et de Recherche en Informatique (IFRI) — UAC  
Auteure : TADOGBE Trésor Steffi  
Encadreur : Dr ZOHOU Pierre Jérôme  
Année académique : 2025-2026

---

## Objectif du projet

Développer un système de prédiction du rendement du maïs à l'échelle 
départementale au Bénin, en comparant plusieurs algorithmes de machine 
learning (régression linéaire, Random Forest, XGBoost), et déployer 
le meilleur modèle dans une interface web d'aide à la décision agricole.

---

## Prérequis d'installation

- Python 3.13 ou plus récent avec des dépendances compatibles, ou Python 3.12 si vous voulez conserver des versions plus anciennes des bibliothèques.
- Installer les dépendances avec `pip install -r requirements.txt` après avoir activé l'environnement virtuel.

## Structure du projet

```
ZeaMays-Yield-Prediction-Benin/
│
├── README.md                          # Documentation générale du projet
├── requirements.txt                   # Dépendances Python
├── .gitignore                         # Fichiers exclus du contrôle de version
│
├── data/
│   ├── raw/                           # Données brutes originales (non modifiées)
│   ├── processed/                     # Données nettoyées et prêtes à l'emploi
│   ├── predictions/                   # Résultats des prédictions
│   └── metadata/                      # Informations sur les sources de données
│
├── notebooks/
│   ├── 00_test_environnement.ipynb
│   ├── 00b_download_nasa_power.ipynb
│   ├── 01_exploratory_data_analysis.ipynb
│   ├── 02_preprocessing.ipynb
│   ├── 03_feature_engineering.ipynb
│   ├── 04_model_training.ipynb
│   └── 05_model_evaluation.ipynb
│
├── models/
│   ├── trained_models/                # Modèles sérialisés (.pkl, .joblib)
│   ├── model_evaluation/              # Rapports et métriques de performance
│   └── hyperparameters/               # Configurations testées
│
├── app/                               # Interface web Flask
│   ├── templates/                     # Fichiers HTML
│   ├── static/                        # CSS et assets
│   └── app.py                         # Point d'entrée de l'application
│
├── reports/
│   ├── figures/                       # Graphiques et visualisations
│   ├── tables/                        # Tableaux de résultats
│   └── analysis_report.md             # Synthèse des analyses
│
└── src/                               # Fonctions réutilisables
    ├── data_processing/
    ├── models/
    ├── evaluation/
    └── utils/
```

### Description des répertoires

- **data/** : Stockage de toutes les données, organisées en trois étapes : brutes, traitées et prédictions.
- **notebooks/** : Analyses et expérimentations Jupyter suivant une progression logique numérotée.
- **models/** : Modèles entraînés, métriques de performance et configurations d'hyperparamètres.
- **app/** : Application web Flask pour servir le modèle en production.
- **reports/** : Visualisations et rapports générés tout au long du projet.
- **src/** : Modules Python réutilisables partagés entre les notebooks.

---

## Travail réalisé (résumé)

1. **Collecte des données climatiques** — téléchargement NASA POWER (mensuel, 2003-2022) pour les 12 départements, paramètres : précipitations, températures (moyenne/max/min), humidité et rayonnement.
2. **Prétraitement des rendements** — extraction de la feuille "Maïs", sélection des départements, conversion kg/ha -> t/ha, harmonisation des noms (ex. Atakora/Atacora, Kouffo/Couffo).
3. **Fusion climat + rendement** — jointure par département et année, sauvegarde du dataset final dans data/processed/dataset_final.csv.
4. **Contrôle qualité et corrections** — identification des valeurs manquantes, exclusion du Littoral, correction des précipitations (mm/jour -> mm/mois) et recalcul de l'indice de stress hydrique.
5. **Feature engineering** — cumul saisonnier des précipitations, amplitude thermique, stress thermique, variable temporelle normalisée et encodage des départements.
6. **Entraînement des modèles** — régression linéaire, Random Forest et XGBoost, avec évaluation RMSE/R2/MAE.
7. **Application web** — point d'entrée Flask minimal (placeholder) pour la future interface d'aide à la décision.