document.addEventListener('DOMContentLoaded', function() {
    const pmSchedule = [
        { name: 'Check Oil Levels', time: '09:00 AM', date: '2024-07-28' },
        { name: 'Inspect Air Filters', time: '11:00 AM', date: '2024-07-29' },
        { name: 'Lubricate Bearings', time: '02:00 PM', date: '2024-08-01' },
        { name: 'Replace Filters', time: '10:00 AM', date: '2024-08-02' },
        { name: 'Check Pressure Gauges', time: '03:00 PM', date: '2024-08-04' }
    ];

    function groupByWeek(schedule) {
        const weeks = {};

        schedule.forEach(item => {
            const date = new Date(item.date);
            const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
            const weekKey = startOfWeek.toISOString().split('T')[0];

            if (!weeks[weekKey]) {
                weeks[weekKey] = [];
            }

            weeks[weekKey].push(item);
        });

        return weeks;
    }

    function renderSchedule() {
        const scheduleContainer = document.getElementById('pm-schedule');
        const weeks = groupByWeek(pmSchedule);
        let htmlContent = '';

        Object.keys(weeks).forEach(week => {
            htmlContent += `
                <div class="card mb-3">
                    <div class="card-header">
                        Week Starting ${week}
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>PM Name</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            weeks[week].forEach(schedule => {
                htmlContent += `
                    <tr>
                        <td>${schedule.name}</td>
                        <td>${schedule.time}</td>
                        <td>${schedule.date}</td>
                    </tr>
                `;
            });

            htmlContent += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        });

        scheduleContainer.innerHTML = htmlContent;
    }

    document.getElementById('add-schedule-btn').addEventListener('click', function() {
        const pmName = prompt("Enter PM Name:");
        const pmTime = prompt("Enter Time (e.g., 10:00 AM):");
        const pmDate = prompt("Enter Date (e.g., 2024-07-30):");

        if (pmName && pmTime && pmDate) {
            pmSchedule.push({ name: pmName, time: pmTime, date: pmDate });
            renderSchedule();
        }
    });

    renderSchedule();
});
