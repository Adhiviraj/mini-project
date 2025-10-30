const libraryLogsRef = database.ref('library_logs');
const tableBody = document.getElementById('library-table-body');
const noDataMessage = document.getElementById('no-data-message');
const exportBtn = document.getElementById('export-excel-btn');

// Load library data
libraryLogsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    tableBody.innerHTML = '';

    if (!data) {
        noDataMessage.classList.remove('d-none');
        return;
    }

    noDataMessage.classList.add('d-none');
    Object.keys(data).forEach(key => {
        const record = data[key];
        const row = `
            <tr>
                <td>${record.studentName || '—'}</td>
                <td>${record.rfid || '—'}</td>
                <td>${record.entryTime || '—'}</td>
                <td>${record.exitTime || '—'}</td>
                <td>${record.status || '—'}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
});

// Export to Excel
exportBtn.addEventListener('click', () => {
    const wb = XLSX.utils.table_to_book(document.getElementById('library-table'));
    XLSX.writeFile(wb, 'library_logs.xlsx');
});
