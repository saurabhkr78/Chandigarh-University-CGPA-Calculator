const grades = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'E': 0,
    'F': 0,
    'I': 0
};

let subjects = [];

function addSubject() {
    const subjectInput = document.getElementById('subject');
    const creditsInput = document.getElementById('credits');
    const subject = subjectInput.value;
    const credits = creditsInput.value;

    if (subject && credits) {
        subjects.push({ subject, credits: Number(credits), grade: 'A+' }); // Default grade is set to 'A+'
        loadSubjects();
        subjectInput.value = '';
        creditsInput.value = '';
        subjectInput.focus();
    }
}

function editSubject(index) {
    const newSubject = prompt('Edit Subject', subjects[index].subject);
    const newCredits = prompt('Edit Credits', subjects[index].credits);
    if (newSubject !== null && newCredits !== null) {
        subjects[index].subject = newSubject;
        subjects[index].credits = Number(newCredits);
        loadSubjects();
    }
}

function loadSubjects() {
    const subjectsList = document.getElementById('subjects-list');
    subjectsList.innerHTML = '';

    subjects.forEach((subj, index) => {
        subjectsList.innerHTML += `
            <tr>
                <td>${subj.subject}</td>
                <td>${subj.credits}</td>
                <td>
                    <select id="grade-${index}">
                        ${Object.keys(grades).map(grade => `<option value="${grades[grade]}">${grade}</option>`).join('')}
                    </select>
                </td>
                <td><button onclick="editSubject(${index})">Edit</button></td>
            </tr>
        `;
    });
}

function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((subj, index) => {
        const gradePoints = Number(document.getElementById(`grade-${index}`).value);
        totalPoints += gradePoints * subj.credits;
        totalCredits += subj.credits;
    });

    const cgpa = totalPoints / totalCredits;
    const resultElement = document.getElementById('result');
    resultElement.innerText = `CGPA: ${cgpa.toFixed(2)}`;
}
function printPage() {
    window.print();
}


window.onload = loadSubjects;
