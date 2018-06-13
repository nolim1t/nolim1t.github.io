/*
  Beta Lightning network addition

  check charge: https://ddanppib10.execute-api.us-east-2.amazonaws.com/awslightning1/generateinvoice?checkCharge=true&chargeId=
*/
var lnapp = new Vue({
  el: '#lnapp',
  data: {
    amount: '0.50',
    message: '',
    lndinvoice: '',
    chargeId: ''
  },
  methods: {
    generateInvoice: function () { // Generates BTC lightning invoice
      var resultElement = document.getElementById('result');
      if (parseFloat(this.amount) >= 0.005 && document.getElementById("descriptionform").value != '') {
        // If description not empty and greator than half a cent
        resultElement.innerHTML = 'Amount is ' + this.amount.toString();
        const base_url = "https://ddanppib10.execute-api.us-east-2.amazonaws.com/awslightning1/generateinvoice"
        var url = base_url + "?showInvoice=true&invoiceAmount=" + this.amount.toString() + "&invoiceDescription=" + encodeURIComponent(document.getElementById("descriptionform").value);
        resultElement.innerHTML = 'Fetching....';
        console.log('fetching ' + url);
                document.getElementById("submitbutton").disabled = "true"; // disable submit button
        axios.get(url).then((response) => {
          console.log(response.data.info);
          if (response.data.info['id'] !== undefined && response.data['lnd_payment_request'] !== undefined) {
            this.chargeId = response.data.info['id'];
            this.lndinvoice = response.data['lnd_payment_request'];
            var textarea_html = "<textarea id='lndtextarea' cols='1' rows='5' style='width: 400px; height: 100px' onSelect='document.execCommand(\"copy\");' onClick='document.getElementById(\"lndtextarea\").select(); '>" + response.data['lnd_payment_request'] + "</textarea>";
            resultElement.innerHTML = '<strong>Pay the following TESTNET Lightning Invoice:</strong><br /><img src="http://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=' + response.data['lnd_payment_request'] + '" /><br />or copy the following payment request<br />' + textarea_html;
          } else {
            resultElement.innerHTML = 'Oh No! There was an error in response from LN API';
          }
        });
      } else {
        console.log('Do not submit');
      }
    }
  }
});

function toggleLNPay() {
  if (document.getElementById('lnpay').style.visibility == 'hidden') {
    document.getElementById('lnpay').style.visibility = 'visible';
  } else {
    document.getElementById('lnpay').style.visibility = 'hidden';
  }
}
