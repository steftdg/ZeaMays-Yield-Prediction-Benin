# Dictionnaire des variables

## Variables d'identification
| Variable | Description | Type |
|----------|-------------|------|
| departement | Nom du département | texte |
| annee | Année de la campagne agricole | entier |

## Variable cible
| Variable | Description | Unité | Source |
|----------|-------------|-------|--------|
| rendement_t_ha | Rendement du maïs | t/ha | DSA Bénin |

## Variables climatiques mensuelles
Format : precip_MM_mm, temp_moy_MM_c, temp_max_MM_c, temp_min_MM_c,
         humidite_MM_pct, rayonnement_MM
où MM = 01 à 12 (janvier à décembre)

| Variable | Description | Unité | Source |
|----------|-------------|-------|--------|
| precip_MM_mm | Précipitation totale du mois MM | mm | NASA POWER |
| temp_moy_MM_c | Température moyenne du mois MM | °C | NASA POWER |
| temp_max_MM_c | Température maximale du mois MM | °C | NASA POWER |
| temp_min_MM_c | Température minimale du mois MM | °C | NASA POWER |
| humidite_MM_pct | Humidité relative du mois MM | % | NASA POWER |
| rayonnement_MM | Rayonnement solaire du mois MM | MJ/m²/jour | NASA POWER |

## Variables annuelles synthétiques
| Variable | Description | Unité | Source |
|----------|-------------|-------|--------|
| precip_annuelle_mm | Précipitation totale annuelle | mm | Calculé |
| temp_moy_annuelle_c | Température moyenne annuelle | °C | Calculé |
| temp_max_annuelle_c | Température maximale annuelle | °C | Calculé |
| temp_min_annuelle_c | Température minimale annuelle | °C | Calculé |
| humidite_moy_annuelle_pct | Humidité relative moyenne annuelle | % | Calculé |
| rayonnement_moyen_annuel | Rayonnement solaire moyen annuel | MJ/m²/jour | Calculé |
| indice_stress_hydrique | Ratio précipitations / ETP estimée | sans unité | Calculé |

## Variables construites (feature engineering)
| Variable | Description | Unité | Source |
|----------|-------------|-------|--------|
| precip_saison1_mm | Précipitations cumulées mars-juillet | mm | Calculé |
| precip_saison2_mm | Précipitations cumulées septembre-novembre | mm | Calculé |
| precip_croissance_mm | Précipitations cumulées mai-octobre | mm | Calculé |
| amplitude_MM_c | Amplitude thermique du mois MM (Tmax-Tmin) | °C | Calculé |
| amplitude_annuelle_c | Amplitude thermique moyenne annuelle | °C | Calculé |
| stress_thermique_MM | 1 si Tmax > 35°C en mois MM, sinon 0 | binaire | Calculé |
| nb_mois_stress_thermique | Nombre de mois avec Tmax > 35°C | mois | Calculé |
| annee_normalisee | Année normalisée entre 0 (2003) et 1 (2022) | sans unité | Calculé |
| departement_encode | Encodage numérique du département | entier | Calculé |