const NVSCalculator = {
    init: function() {
        this.populateDateDropdowns();
        this.populateStateDropdown();
        this.populateClassDropdown();
    },

    populateDateDropdowns: function() {
        const daySelect = document.getElementById('nvsBirthDay');
        const monthSelect = document.getElementById('nvsBirthMonth');
        const yearSelect = document.getElementById('nvsBirthYear');

        for(let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        for(let i = 2018; i >= 2009; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    },

    checkEligibility: function(birthdate) {
        const startDate = new Date(2014, 4, 1);
        const endDate = new Date(2016, 6, 31);
        return birthdate >= startDate && birthdate <= endDate;
    },

    generateLead: function() {
        const studentName = document.getElementById('nvsName').value;
        const mobileNumber = document.getElementById('nvsMobile').value;
        const birthDay = document.getElementById('nvsBirthDay').value;
        const birthMonth = document.getElementById('nvsBirthMonth').value;
        const birthYear = document.getElementById('nvsBirthYear').value;
        const birthdate = new Date(birthYear, birthMonth - 1, birthDay);
        const state = document.getElementById('nvsState').value;
        const studentClass = document.getElementById('nvsClass').value;

        const isEligible = this.checkEligibility(birthdate);
        const result = document.getElementById('nvsResult');
        const submitButton = document.getElementById('nvsSubmitBtn');

        result.innerHTML = isEligible ? 
            `Success! ${studentName} is ELIGIBLE for JNVST in 2026.` : 
            `Not Eligible. ${studentName} is NOT ELIGIBLE for JNVST in 2026.`;
        result.className = isEligible ? 'nvs-result success' : 'nvs-result failure';

        submitButton.innerHTML = 'Get Free Trial Class - Instant';
        submitButton.style.backgroundColor = '#04AA6D';
        submitButton.style.color = 'white';
        submitButton.onclick = function () {
            window.location.href = "https://course.thespeedybrains.com/s/pages/nv-redirect";
        };

        this.sendDataToCRM({
            name: studentName,
            phone: mobileNumber,
            birthdate: birthdate.toISOString().split('T')[0],
            state: state,
            class: studentClass,
            isEligible: isEligible
        });
    },

    sendDataToCRM: function(data) {
        fetch("https://flow.tsblive.in/webhook/66699a1f-c831-4066-a09f-8232325828bf", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.ok ? console.log("Data sent successfully.") : console.error("Error sending data."))
        .catch(error => console.error("Error sending data: ", error));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    NVSCalculator.init();
});
