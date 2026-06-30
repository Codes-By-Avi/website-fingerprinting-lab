import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

# ✅ Full path to your traces.json file
trace_file = "./traces.json"

def eval():
    y_pred_full, y_test_full = [], []

    for i in range(10):  # retrain 10 times to reduce randomness
        # 1. Load data from JSON file
        with open(trace_file, "r") as f:
            data = json.load(f)

        # Convert traces and labels to numpy arrays
        X = np.array(data["traces"])
        y = np.array(data["labels"])  # labels must exist in your traces.json

        # 2. Split into training and testing sets (80/20 split)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=i, stratify=y
        )

        # 3. Train a Random Forest classifier
        clf = RandomForestClassifier(n_estimators=100, random_state=i)
        clf.fit(X_train, y_train)

        # 4. Predict labels for the test set
        y_pred = clf.predict(X_test)

        # Store results for combined evaluation
        y_test_full.extend(y_test)
        y_pred_full.extend(y_pred)

    # 5. Print final classification report
    print(classification_report(y_test_full, y_pred_full))

if __name__ == "__main__":
    eval()