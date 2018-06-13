/*
  Beta Lightning network addition

*/
const base_url = "https://ddanppib10.execute-api.us-east-2.amazonaws.com/awslightning1/generateinvoice"
var lnapp = new Vue({
  el: '#lnapp',
  data: {
    amount: '0.50',
    message: '',
    lndinvoice: '',
    chargeId: '',
    paid: false,
    pollCount: 0,
    maxpollIntervals: 20
  },
  methods: {
    generateInvoice: function () { // Generates BTC lightning invoice
      var resultElement = document.getElementById('result');
      if (parseFloat(this.amount) >= 0.005 && document.getElementById("descriptionform").value != '') {
        // If description not empty and greator than half a cent
        resultElement.innerHTML = 'Amount is ' + this.amount.toString();
        var url = base_url + "?showInvoice=true&invoiceAmount=" + this.amount.toString() + "&invoiceDescription=" + encodeURIComponent(document.getElementById("descriptionform").value);
        resultElement.innerHTML = 'Fetching....';
        console.log('fetching ' + url);
                document.getElementById("submitbutton").disabled = "true"; // disable submit button
        axios.get(url).then((response) => {
          this.logConsole(response.data.info);
          if (response.data.info['id'] !== undefined && response.data['lnd_payment_request'] !== undefined) {
            this.chargeId = response.data.info['id'];
            this.lndinvoice = response.data['lnd_payment_request'];
            this.pollCount = 0;
            var textarea_html = "<textarea id='lndtextarea' cols='1' rows='5' style='width: 400px; height: 100px' onSelect='document.execCommand(\"copy\");' onClick='document.getElementById(\"lndtextarea\").select(); '>" + response.data['lnd_payment_request'] + "</textarea>";
            resultElement.innerHTML = '<strong>Pay the following TESTNET Lightning Invoice:</strong><br /><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=' + response.data['lnd_payment_request'] + '" /><br />or copy the following payment request<br />' + textarea_html;
            setInterval(function () {
              this.pollPayment(this.chargeId)
            }.bind(this), 10000);
          } else {
            resultElement.innerHTML = 'Oh No! There was an error in response from LN API';
          }
        });
      } else {
        console.log('Do not submit');
      }
    },
    pollPayment: function (chargeId) {
      this.pollCount += 1 ;
      if (this.pollCount <= this.maxpollIntervals || this.paid === true) { // Either max poll or paid
        axios.get(base_url + '?checkCharge=true&chargeId=' + chargeId).then((response) => {
          if (response.data['response'] !== undefined) {
            if (response.data['response']['paid'] !== undefined) {
              if (response.data['response']['paid'] === true) {
                this.paid = response.data['response']['paid'];
                document.getElementById('result').innerHTML = 'Thank you for your payment!';
              }
              this.logConsole(response.data['response']);
              this.logConsole(this.pollCount.toString());
            }
          }
        });
      } else {
        this.logConsole("No longer polling function because polled many times or paid");
      }
    },
    logConsole: function(message) {
      console.log(message);
    }
  } // End Methods in vue.js object
}); // End VUE.js

function toggleLNPay() {
  if (document.getElementById('lnpay').style.visibility == 'hidden') {
    document.getElementById('lnpay').style.visibility = 'visible';
  } else {
    document.getElementById('lnpay').style.visibility = 'hidden';
  }
}
