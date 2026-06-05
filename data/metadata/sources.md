# Sources de données

## Données de rendement — DSA Bénin
- **Source** : Direction de la Statistique Agricole (DSA)
- **Plateforme** : Open Data Bénin
- **URL plateforme** : https://benin.opendataforafrica.org/qnewqoe
- **URL originale** : https://www.dsa.agriculture.bj.gouv
- **Fichier brut** : rendement_départementale.xlsx
- **Fréquence** : Annuelle
- **Période disponible** : 1995-2023
- **Période utilisée** : 2003-2022
- **Granularité** : Département et commune / Année
- **Variables** : Superficie (ha), Production (t), Rendement (kg/ha)
- **Description** : Données issues des enquêtes statistiques agricoles
  organisées annuellement par la DSA. Couvre les superficies, rendements
  et productions des principales cultures du Bénin.

## Données climatiques — NASA POWER
- **Source** : NASA POWER Agroclimatology
- **URL** : https://power.larc.nasa.gov
- **Méthode d'accès** : API REST (endpoint monthly/point)
- **Fréquence** : Mensuelle agrégée en annuelle
- **Période utilisée** : 2003-2022
- **Granularité** : Point GPS central par département / Mois
- **Variables collectées** :
  - PRECTOTCORR : Précipitations totales corrigées (mm/jour)
  - T2M : Température moyenne à 2m (°C)
  - T2M_MAX : Température maximale à 2m (°C)
  - T2M_MIN : Température minimale à 2m (°C)
  - RH2M : Humidité relative à 2m (%)
  - ALLSKY_SFC_SW_DWN : Rayonnement solaire (MJ/m²/jour)
- **Note** : Les précipitations sont fournies en mm/jour
  et ont été converties en mm/mois en multipliant
  par le nombre de jours de chaque mois.

## Données FAO — FAOSTAT
- **Source** : Organisation des Nations Unies pour l'alimentation
  et l'agriculture (FAO)
- **URL** : https://www.fao.org/faostat
- **Fichier brut** : FAOSTAT_data_fr_6-1-2026.csv
- **Période disponible** : 1961-2024
- **Granularité** : National / Année
- **Usage** : Validation croisée des données DSA uniquement
- **Résultat validation** : Ecart moyen de 4.5% avec les données DSA
  sur la période 2003-2022, confirmant la fiabilité des données utilisées.
  Seule l'année 2007 présente un écart notable de 21.6%.