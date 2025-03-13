const NVSCalculator = {
    init: function() {
        this.populateDateDropdowns();
        this.populateStateDropdown();
        this.populateClassDropdown();
        this.injectStyles();
    },

    injectStyles: function() {
        const styles = `
            <style>
                .nvs-wrapper {
                    background-image: linear-gradient(to right top, #e0e3c2, #f3dec3, #fedbce, #ffdadd, #fddae6, #f9dcee, #f2def6, #eedef9, #e9defb, #e3defd, #dddeff);
                    padding: 20px;
                    border-radius: 15px;
                    width: auto;
                    margin: auto;
                }
                .nvs-form {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 2px solid #290324;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .nvs-button {
                    width: 100%;
                    padding: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #000000;
                    background-color: #F1C40F;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .nvs-button:hover {
                    background-color: #f1c40f;
                }
                .nvs-result {
                    margin-top: 20px;
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                }
                .nvs-result.success { color: darkgreen; }
                .nvs-result.failure { color: red; }
            </style>
        `;
        document.head.insertAdjacentHTML("beforeend", styles);
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
