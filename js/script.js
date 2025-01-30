document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Input values
  var loanAmount = parseFloat(document.getElementById('loan-amount').value);
  var interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
  var loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;

  // EMI Calculation
  var emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
  var totalPayment = emi * loanTerm;
  var totalInterest = totalPayment - loanAmount;

  // Display result
  document.getElementById('emi').textContent = emi.toFixed(2);
  document.getElementById('amount').textContent = loanAmount.toFixed(2);
  document.getElementById('rate').textContent = (interestRate * 12 * 100).toFixed(2);
  document.getElementById('term').textContent = loanTerm / 12;

  // Show result section
  document.getElementById('result').style.display = 'block';

  // Create Chart for Loan
  var chartData = {
    labels: Array.from({ length: loanTerm / 12 }, (v, i) => `Year ${i + 1}`),
    datasets: [{
      label: 'Total Payment Over Loan Term',
      data: Array.from({ length: loanTerm / 12 }, (v, i) => emi * (i + 1)),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: false,
    }]
  };

  var ctx = document.getElementById('loan-chart').getContext('2d');
  var loanChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

// Print functionality
document.getElementById('print-btn').addEventListener('click', function () {
  window.print();
});

// Share functionality
document.getElementById('share-btn').addEventListener('click', function () {
  var url = window.location.href; // Get current page URL
  var shareText = "Check out this loan calculator!";
  if (navigator.share) {
    navigator.share({
      title: 'Loan Calculator',
      text: shareText,
      url: url
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch((error) => {
      console.log('Error sharing', error);
    });
  } else {
    // If Web Share API is not supported, use fallback
    alert("Share this link: " + url);
  }
});
