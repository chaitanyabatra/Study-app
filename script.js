document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    const incrementButton = document.getElementById('increment-btn');
    const totalSolvedElement = document.getElementById('total-solved');
    const saveTimetableButton = document.getElementById('save-timetable');
    const addRowButton = document.getElementById('add-row');
    const startTimerButton = document.getElementById('start-timer');
    const resetTimerButton = document.getElementById('reset-timer');
    const timerElement = document.getElementById('timer');
    const timetable = document.getElementById('timetable');

    let count = 0;
    let totalSolved = localStorage.getItem('totalSolved') ? parseInt(localStorage.getItem('totalSolved')) : 0;
    let timerInterval;
    let timerSeconds = 0;

    totalSolvedElement.textContent = `Total questions solved till now: ${totalSolved}`;

    incrementButton.addEventListener('click', () => {
        count++;
        counterElement.textContent = count;

        if (count === 40) {
            counterElement.textContent = 'Congratulations! You did it!';
            counterElement.style.backgroundColor = 'red';
            document.body.style.backgroundColor = 'orange';  // Change background color of the whole page
            incrementButton.disabled = false;  // Disable the button after reaching 40
        }

        if (count === 50) {
            counterElement.textContent = 'Congratulations! You did it!';
            counterElement.style.backgroundColor = 'orange';
            document.body.style.backgroundColor = 'pink';  // Change background color of the whole page
            incrementButton.disabled = false;  // Disable the button after reaching 40
        }

        totalSolved++;
        localStorage.setItem('totalSolved', totalSolved);
        totalSolvedElement.textContent = `Total questions solved till now: ${totalSolved}`;
    });

    saveTimetableButton.addEventListener('click', () => {
        const timetableData = [];
        const rows = timetable.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index > 0) { // Skip header row
                const timeCell = row.cells[0].textContent;
                const subjectCell = row.cells[1].textContent;
                timetableData.push({ time: timeCell, subject: subjectCell });
            }
        });
        localStorage.setItem('timetable', JSON.stringify(timetableData));
        alert('Timetable saved!');
    });

    addRowButton.addEventListener('click', () => {
        const newRow = timetable.insertRow();
        const timeCell = newRow.insertCell(0);
        const subjectCell = newRow.insertCell(1);
        const actionCell = newRow.insertCell(2);
        timeCell.contentEditable = "true";
        subjectCell.contentEditable = "true";
        timeCell.textContent = "New Time";
        subjectCell.textContent = "New Subject";
        actionCell.innerHTML = '<button class="delete-row">Delete</button>';
    });

    timetable.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-row')) {
            const row = event.target.closest('tr');
            row.remove();
        }
    });

    const savedTimetable = localStorage.getItem('timetable');
    if (savedTimetable) {
        const timetableData = JSON.parse(savedTimetable);
        timetableData.forEach((entry, index) => {
            if (index < timetable.rows.length - 1) {
                timetable.rows[index + 1].cells[0].textContent = entry.time;
                timetable.rows[index + 1].cells[1].textContent = entry.subject;
            } else {
                const newRow = timetable.insertRow();
                const timeCell = newRow.insertCell(0);
                const subjectCell = newRow.insertCell(1);
                const actionCell = newRow.insertCell(2);
                timeCell.contentEditable = "true";
                subjectCell.contentEditable = "true";
                timeCell.textContent = entry.time;
                subjectCell.textContent = entry.subject;
                actionCell.innerHTML = '<button class="delete-row">Delete</button>';
            }
        });
    }

    startTimerButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timerSeconds++;
            const hours = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
            const seconds = String(timerSeconds % 60).padStart(2, '0');
            timerElement.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    });

    resetTimerButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerSeconds = 0;
        timerElement.textContent = '00:00:00';
    });
});
