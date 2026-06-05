
=== RAPPORT D'EVALUATION DES MODELES ===

Dataset : 220 observations, 11 départements, 2003-2022
Features utilisées : 30 (sélectionnées par importance Random Forest)

--- MEILLEUR MODELE : Random Forest (top 30) ---
R²   test  : 0.5913
RMSE test  : 0.2099 t/ha
MAE  test  : 0.1634 t/ha
Biais moyen: -0.021 t/ha

--- INTERPRETATION ---
Le modèle explique 59% de la variance du rendement.
Une erreur moyenne de 0.21 t/ha sur un rendement moyen de 1.22 t/ha
représente une erreur relative de 17.2%.

Les 3 variables les plus importantes :
1. humidite_05_pct           (16.0%)
2. rayonnement_moyen_annuel  (12.4%)
3. rayonnement_11            (9.3%)

--- TABLEAU COMPARATIF ---
                      Modele  RMSE_test  R2_test  MAE_test
         Régression Linéaire     0.3188   0.0572    0.2584
               Random Forest     0.2158   0.5680    0.1651
                     XGBoost     0.2289   0.5140    0.1668
          XGBoost Régularisé     0.2130   0.5793    0.1645
Régression Linéaire (top 30)     0.2344   0.4903    0.1885
      Random Forest (top 30)     0.2099   0.5913    0.1634
 XGBoost Régularisé (top 30)     0.2109   0.5874    0.1643
