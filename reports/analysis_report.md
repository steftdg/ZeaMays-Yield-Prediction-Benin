# Synthèse des analyses

Ce fichier regroupera les principaux résultats de l'analyse exploratoire, du prétraitement, de l'entraînement et de l'évaluation des modèles.

# Rapport d'analyse exploratoire des données
## Système de prédiction du rendement du maïs au Bénin

**Auteure** : TADOGBE Trésor Steffi  
**Date** : Juin 2026  
**Dataset** : 220 observations — 11 départements — 2003 à 2022

---

## 1. Qualité des données

Le dataset final a été constitué en fusionnant les données de rendement
de la Direction de la Statistique Agricole du Bénin avec les données
climatiques mensuelles NASA POWER pour les 11 départements producteurs
de maïs sur la période 2003-2022.

Le département du Littoral a été exclu de l'analyse en raison de
l'absence quasi totale de production maïsière (rendement moyen de
0.05 t/ha sur une seule année disponible), ce qui reflète la réalité
d'un département essentiellement urbain centré sur Cotonou.

Après nettoyage, le dataset ne présente aucune valeur manquante.
La validation croisée avec les données FAOSTAT confirme la fiabilité
des données DSA avec un écart moyen de 4.5% sur la période étudiée.

---

## 2. Distribution des rendements

Le rendement moyen national sur la période 2003-2022 est de **1.22 t/ha**,
avec un écart-type de 0.33 t/ha traduisant une variabilité significative
entre départements et entre années.

### Classement des départements par rendement moyen

| Département | Rendement moyen (t/ha) |
|-------------|----------------------|
| Atacora     | 1.65                 |
| Donga       | 1.54                 |
| Alibori     | 1.44                 |
| Borgou      | 1.41                 |
| Ouémé       | 1.17                 |
| Plateau     | 1.13                 |
| Atlantique  | 1.11                 |
| Mono        | 1.11                 |
| Couffo      | 1.04                 |
| Collines    | 0.94                 |
| Zou         | 0.90                 |

Les départements du Nord (Atacora, Donga, Alibori, Borgou) affichent
systématiquement les meilleurs rendements malgré une pluviométrie plus
faible. Ce paradoxe apparent s'explique par de meilleures conditions
de rayonnement solaire, des amplitudes thermiques plus marquées
favorables à la photosynthèse, et des pratiques agricoles adaptées.

---

## 3. Evolution temporelle

L'analyse de la série temporelle du rendement moyen national révèle
plusieurs faits marquants :

- **2011 est l'année record** avec 1.47 t/ha, correspondant à une
  saison pluvieuse particulièrement favorable
- **2010 et 2019 sont les années les plus faibles** avec environ
  1.08 t/ha, années marquées par des anomalies climatiques au Bénin
- Une légère tendance à la hausse est observable sur la période
  mais reste masquée par la forte variabilité inter-annuelle

---

## 4. Relations entre variables climatiques et rendement

### 4.1 Corrélations directes

L'analyse de la matrice de corrélation entre le rendement et les
variables climatiques révèle des relations contre-intuitives à
première vue :

- La **précipitation annuelle** est négativement corrélée au rendement
  (r = -0.33). Ce résultat s'explique par un effet département :
  les zones les plus pluvieuses sont les départements côtiers du Sud
  qui ont paradoxalement les rendements les plus faibles.
- L'**humidité relative annuelle** présente la corrélation négative
  la plus forte (r = -0.56), pour la même raison.
- Le **rayonnement solaire** est positivement corrélé au rendement,
  les départements du Nord bénéficiant de plus d'ensoleillement.

### 4.2 Effet département

Le graphique rendement vs précipitations coloré par département
confirme que la relation entre pluie et rendement n'est pas linéaire
et dépend fortement du contexte géographique. Les départements du Nord
comme Alibori et Atacora obtiennent de bons rendements avec 700-900mm
de pluie annuelle, tandis que les départements côtiers avec 1400-1800mm
ont des rendements inférieurs.

Cela justifie l'utilisation de méthodes d'apprentissage automatique
capables de capturer ces interactions complexes plutôt qu'une simple
régression linéaire.

---

## 5. Variables les plus importantes

L'analyse de l'importance des variables selon le modèle Random Forest
identifie les trois facteurs les plus déterminants :

1. **humidite_05_pct** (16.0%) : humidité relative en mai,
   marqueur du début de la grande saison des pluies
2. **rayonnement_moyen_annuel** (12.4%) : ensoleillement annuel,
   facteur discriminant entre Nord et Sud
3. **rayonnement_11** (9.3%) : rayonnement de novembre,
   indicateur de la fin du cycle cultural

Les variables de rayonnement solaire dominent le classement,
confirmant que l'ensoleillement est le principal facteur
différenciateur entre les zones à fort et faible rendement au Bénin.

---

## 6. Stress thermique

L'analyse du stress thermique (température maximale dépassant 35°C)
révèle de fortes disparités départementales :

- **Alibori** : 9.1 mois de stress thermique en moyenne par an
- **Borgou** : 5.8 mois
- **Atacora** : 4.8 mois
- **Atlantique et Ouémé** : 0 mois

Malgré un stress thermique élevé, les départements du Nord maintiennent
de bons rendements, suggérant que les variétés cultivées dans ces zones
sont adaptées aux températures élevées, ou que d'autres facteurs
compensateurs sont à l'oeuvre.

---

## 7. Conclusions de l'EDA

L'analyse exploratoire met en évidence quatre conclusions principales :

1. Les rendements du maïs au Bénin sont davantage déterminés par
   le rayonnement solaire et l'humidité que par les précipitations seules.

2. L'effet département est dominant : la localisation géographique
   capture des facteurs pédologiques, agronomiques et climatiques
   combinés que les variables individuelles ne peuvent expliquer séparément.

3. La variabilité inter-annuelle est significative et reflète
   la sensibilité de la culture aux anomalies climatiques saisonnières.

4. La non-linéarité des relations entre variables justifie le recours
   aux méthodes d'ensemble (Random Forest, XGBoost) plutôt qu'aux
   approches linéaires classiques.

---

*Figures associées disponibles dans `reports/figures/`*