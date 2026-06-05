# Hyperparamètres des modèles

## Random Forest (top 30) — meilleur modèle
n_estimators=200, max_depth=10, min_samples_split=5,
min_samples_leaf=2, random_state=42

## XGBoost Régularisé (top 30)
n_estimators=200, learning_rate=0.03, max_depth=3,
subsample=0.7, colsample_bytree=0.6, min_child_weight=5,
reg_alpha=0.5, reg_lambda=2.0, gamma=0.2, random_state=42