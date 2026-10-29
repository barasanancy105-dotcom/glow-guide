
let completedRoutines = 5;
const totalRoutines = 7;

const completeButton = document.getElementById("complete-button");
const routineCount = document.getElementById("routine-count");
const progressNumber = document.getElementById("progress-number");
const progressCircle = document.getElementById("progress-circle");
const progressMessage = document.getElementById("progress-message");
const routineCaption = document.getElementById("routine-caption");

function updateProgress() {
    const percentage = Math.round(
        (completedRoutines / totalRoutines) * 100
    );

    routineCount.textContent =
        completedRoutines + " / " + totalRoutines;

    progressNumber.textContent = percentage + "%";

    progressCircle.style.background =
        `conic-gradient(#bd7776 ${percentage}%, #f2ddda ${percentage}%)`;

    routineCaption.textContent = percentage + "% completed";

    progressMessage.textContent =
        percentage === 100
            ? "Amazing! All routines completed!"
            : "Every little step counts.";
}

completeButton.addEventListener("click", function () {
    if (completedRoutines < totalRoutines) {
        completedRoutines++;
        updateProgress();
    }

    if (completedRoutines === totalRoutines) {
        completeButton.textContent = "All routines completed ✓";
        completeButton.disabled = true;
    }
});

updateProgress();
let products = [
    { name: "Gentle Cleanser", category: "Cleanser", price: 800 },
    { name: "Daily Moisturizer", category: "Moisturizer", price: 1200 },
    { name: "Sun Protection", category: "Sunscreen", price: 1000 }
];

const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");

function displayProducts() {
    productList.replaceChildren();

    products.forEach(function (product, index) {
        const card = document.createElement("div");
        card.className = "product-card";

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = product.category;

        const price = document.createElement("p");
        price.textContent = "KSh " + product.price;

        details.append(name, category, price);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.className = "delete-product";

        deleteButton.addEventListener("click", function () {
            products.splice(index, 1);
            displayProducts();
        });

        card.append(details, deleteButton);
        productList.append(card);
    });

    if (productCount) {
        productCount.textContent = products.length;
    }
}

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const category = document.getElementById("product-category").value;
    const price = Number(document.getElementById("product-price").value);

    if (!name || !category || price < 0 || !Number.isFinite(price)) {
        return;
    }

    products.push({ name, category, price });

    productForm.reset();
    displayProducts();
});

displayProducts();
const routineChecks =
    document.querySelectorAll(".routine-check");

const routineStatus =
    document.getElementById("routine-status");

function updateRoutineStatus() {
    let completed = 0;

    routineChecks.forEach(function (checkbox) {
        if (checkbox.checked) {
            completed++;
        }
    });

    routineStatus.textContent =
        completed + " of " + routineChecks.length +
        " steps completed.";
}

routineChecks.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateRoutineStatus);
});

updateRoutineStatus();
const diaryForm = document.getElementById("diary-form");
const diaryList = document.getElementById("diary-list");
const diaryCount = document.getElementById("diary-count");

let diaryEntries = [];

try {
    diaryEntries = JSON.parse(
        localStorage.getItem("glowGuideDiary") || "[]"
    );
} catch (error) {
    diaryEntries = [];
}

function displayDiaryEntries() {
    diaryList.replaceChildren();

    diaryEntries.forEach(function (entry) {
        const card = document.createElement("article");
        card.className = "diary-entry";

        const date = document.createElement("p");
        date.textContent = entry.date;

        const mood = document.createElement("h3");
        mood.textContent = entry.mood;

        const notes = document.createElement("p");
        notes.textContent = entry.notes || "No extra notes.";

        card.append(date, mood, notes);
        diaryList.append(card);
    });

    if (diaryCount) {
        diaryCount.textContent = diaryEntries.length;
    }
}

diaryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const mood = document.getElementById("skin-mood").value;
    const notes = document.getElementById("skin-notes").value.trim();

    if (!mood) {
        return;
    }

    const entry = {
        date: new Date().toLocaleDateString(),
        mood: mood,
        notes: notes
    };

    diaryEntries.unshift(entry);

    localStorage.setItem(
        "glowGuideDiary",
        JSON.stringify(diaryEntries)
    );

    diaryForm.reset();
    displayDiaryEntries();
});

displayDiaryEntries();