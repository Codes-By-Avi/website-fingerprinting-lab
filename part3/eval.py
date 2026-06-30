import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

def eval():
    y_pred_full, y_test_full = [], []

    # Re-train 10 times to reduce randomness
    for i in range(10):
        # 1. Load data from Part 3 traces
        with open("./traces.json", "r") as f:
            data = json.load(f)

        X = np.array(data["traces"])
        y = np.array(data["labels"])  # make sure labels exist in your JSON

        # 2. Split into training/testing sets
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=i, stratify=y
        )

        # 3. Train classifier
        clf = RandomForestClassifier(n_estimators=100, random_state=i)
        clf.fit(X_train, y_train)

        # 4. Predict on test set
        y_pred = clf.predict(X_test)

        # Save predictions for full report
        y_test_full.extend(y_test)
        y_pred_full.extend(y_pred)

    # 5. Print final classification report
    print(classification_report(y_test_full, y_pred_full))

if __name__ == "__main__":
    eval()
