const addPatientButton = document.getElementById(`addPatient`);
const report = document.getElementById(`report`);
const btnSearch = document.getElementById(`btnSearch`);
const patients = [];

//Function to add patient
const addPatient = () => {
    const name = document.getElementById(`name`).value;
    const gender = document.querySelector(`input[name = "gender"]:checked`);
    const age = document.getElementById(`age`).value;
    const condition = document.getElementById(`condition`).value;

    if (name && gender && condition) {
        patients.push({name, gender: gender.value, age, condition});
        resetForm();
        generateReport();
    }
}

//Function to reset info entered by user
const resetForm = () => {
    document.getElementById(`name`).value = "";
    document.getElementById(`age`).value = "";
    document.querySelector(`input[name = "gender"]:checked`).checked = false;
    document.getElementById(`condition`).value = "";
}

    function searchCondition() {
        const input = document.getElementById('conditionInput').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('health_analysis.json')
          .then(response => response.json())
          .then(data => {
            const condition = data.conditions.find(item => item.name.toLowerCase() === input);

            if (condition) {
              const symptoms = condition.symptoms.join(', ');
              const prevention = condition.prevention.join(', ');
              const treatment = condition.treatment;

              resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
              resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

              resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
              resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
              resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
              resultDiv.innerHTML = 'Condition not found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
      }
        btnSearch.addEventListener('click', searchCondition);

//Function to generate report
const generateReport = () => {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };

    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },

        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };

    for (const patient of patients){
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;

    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br><br>`;
    }

    report.innerHTML += `<br>Gender-Based Condition:<br><br>`;
    for(const gender in genderConditionsCount){
        report.innerHTML +=    `${gender}: <br>`;

        for(const condition in genderConditionsCount[gender]){
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br><br>`
        }

    } 
}

//Add event to addPatient button
addPatientButton.addEventListener(`click`, addPatient);


/*
Great question! In JavaScript, both `for...of` and `for...in` are used for looping, but they work in slightly different ways and are used for different scenarios. Here's the breakdown:

### `for (const x of y)`:

* **Used for**: Iterating over **iterable objects** like arrays, strings, maps, and sets.
* **Purpose**: It loops through the **values** of the iterable.
* **Syntax**:

  ```javascript
  for (const x of y) {
    // x will be the value of each element in the iterable
  }
  ```

#### Example with an array:

```javascript
const arr = [10, 20, 30];

for (const x of arr) {
  console.log(x);
}
// Output: 10, 20, 30
```

In this example, `x` will be the actual values of the array (`10`, `20`, `30`).

---

### `for (const x in y)`:

* **Used for**: Iterating over **properties or keys** of an object or the **indices** of an array.
* **Purpose**: It loops through the **keys** or **property names** (indices for arrays) of the object.
* **Syntax**:

  ```javascript
  for (const x in y) {
    // x will be the property or key name of each element
  }
  ```

#### Example with an array:

```javascript
const arr = [10, 20, 30];

for (const x in arr) {
  console.log(x); // Output will be the indices: "0", "1", "2"
}
```

In this example, `x` will be the **index** of each element in the array (`"0"`, `"1"`, `"2"`), not the actual value.

#### Example with an object:

```javascript
const obj = { a: 1, b: 2, c: 3 };

for (const x in obj) {
  console.log(x); // Output: "a", "b", "c"
}
```

Here, `x` will be the **keys** of the object (`"a"`, `"b"`, `"c"`).

---

### Key Differences:

* **`for...of`** loops through **values** in an iterable.

* **`for...in`** loops through **keys** (or property names) in an object, or indices in an array.

* **Use `for...of`** when you want to access values, especially when working with arrays or iterable objects like strings.

* **Use `for...in`** when you need to iterate over object properties or array indices (though generally not recommended for arrays, as it may give unexpected results with array-like objects or non-numeric keys).

Would you like to see any more examples or dive deeper into a particular case?

*/