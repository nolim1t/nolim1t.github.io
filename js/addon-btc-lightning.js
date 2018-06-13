/*
  Beta Lightning network addition
*/
const base_url = "https://ddanppib10.execute-api.us-east-2.amazonaws.com/awslightning1/generateinvoice";
const check_charge_id = (chargeId, callback) => {
  axios.get(base_url + '?checkCharge=true&chargeId=' + chargeId).then((response) => {
    if (response.data['response'] !== undefined) {
      if (response.data['response']['paid'] !== undefined) {
        if (response.data['response']['paid'] === true) {
          callback({
            IsPaid: response.data['response']['paid']
          });
        } else {
          callback({
            IsPaid: response.data['response']['paid']
          });
        }
      } else {
        callback({
          IsPaid: false
        });
      }
    } else {
      callback({
        IsPaid: false
      });
    }
  });
}

var lnapp = new Vue({
  el: '#lnapp',
  data: {
    amount: '0.05',
    message: '',
    lndinvoice: '',
    chargeId: '',
    paid: false,
    pollCount: 0,
    maxpollIntervals: 6,
    resultElement: '',
    pollWaitDiv: '',
    intervalId: ''
  },
  methods: {
    generateInvoice: function () { // Generates BTC lightning invoice
      this.resultElement = document.getElementById('result');
      if (parseFloat(this.amount) >= 0.005 && document.getElementById("descriptionform").value !== '') {
        // If description not empty and greator than half a cent
        this.resultElement.innerHTML = 'Amount is ' + this.amount.toString();
        var url = base_url + "?showInvoice=true&invoiceAmount=" + this.amount.toString() + "&invoiceDescription=" + encodeURIComponent(document.getElementById("descriptionform").value);
        this.resultElement.innerHTML = 'Fetching....';

        // Hide form when submitted
        if (document.getElementById("blurb") !== undefined && document.getElementById("blurb") !== null) document.getElementById("blurb").style.display = 'none'; //  Hide text
        if (document.getElementById("submitbutton") !== undefined) document.getElementById("submitbutton").style.display = 'none'; // disable submit button
        if (document.getElementById("amountinput") !== undefined) document.getElementById("amountinput").style.display = 'none'; // disable input field
        if (document.getElementById("descriptionform") !== undefined && document.getElementById("descriptionform") !== null) document.getElementById("descriptionform").style.display = 'none'; // disable input field

        axios.get(url).then((response) => {
          if (response.data.info['id'] !== undefined && response.data['lnd_payment_request'] !== undefined) {
            this.chargeId = response.data.info['id'];
            this.lndinvoice = response.data['lnd_payment_request'];
            this.pollCount = 1;
            this.paid = false;
            this.resultElement.innerHTML = '<div id="innerresult"><strong>Pay the following TESTNET Lightning Invoice:</strong><span id="waitresults"></span><br />' + this.generateQRCode(response.data['lnd_payment_request']) + '<br />or copy the following payment request<br />' + this.generateLNDTextArea(response.data['lnd_payment_request']) + '</div>';
            this.pollWaitDiv = document.getElementById('waitresults');
            this.intervalId = setInterval(function () {
              console.log("Poll Job ID: " + this.intervalId.toString());
              if (this.pollCount >= this.maxpollIntervals || this.paid === true) {
                console.log("Cancel all waiting");
                if (this.pollWaitDiv !== undefined && this.pollWaitDiv !== null) this.pollWaitDiv.innerHTML = ' (No longer checking for payments. Click <a onClick="check_charge_id(\'' + this.chargeId + '\', (cidcb) => {if (cidcb.IsPaid === true) {document.getElementById(\'result\').innerHTML = \'Thank you for your ⚡️ payment! ✅ \'; } else { console.log(\'Still not paid. \'); } }); ">here</a> to manually check payments)';
                clearInterval(this.intervalId);
              } else {
                if (document.getElementById('waitresults')!== undefined && document.getElementById('waitresults') !== null) {
                  document.getElementById('waitresults').innerHTML = ' (Waiting ' + ((this.pollCount) * 10).toString() + ' seconds out of ' + (this.maxpollIntervals * 10).toString() + ' seconds)';
                  this.pollPayment(this.chargeId)
                } else { // Safety Stop
                  console.log("No longer polling because  'pollWaitDiv' element is no longer appearing");
                  clearInterval(this.intervalId);
                }
              }
            }.bind(this), 10000);
          } else {
            this.resultElement.innerHTML = 'Oh No! There was an error in response from LN API';
          }
        });
      } else {
        console.log('Do not submit');
      }
    },
    generateLNDTextArea: function(lndinvoice) {
      return "<textarea id='lndtextarea' cols='1' rows='5' style='width: 400px; height: 100px' onSelect='document.execCommand(\"copy\");' onClick='document.getElementById(\"lndtextarea\").select(); '>" + lndinvoice + "</textarea>";
    },
    generateQRCode: function(lndinvoice) {
      return "<img src=\"https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=" + lndinvoice + "\" />";
    },
    pollPayment: function (chargeId) {
      console.log("Before running pollPayment: " + this.paid.toString());
      if (this.pollCount < this.maxpollIntervals || this.paid === true) { // Either max poll or paid
        console.log("checking for payments... (ID: " + this.intervalId.toString() + ")");
        this.pollCount += 1;
        check_charge_id(chargeId, function(callback) {
          if (callback['IsPaid'] == true) {
            this.paid = callback.IsPaid;
            if (document.getElementById('waitresults') !== undefined && document.getElementById('waitresults') !== null) document.getElementById('waitresults').innerHTML = '';
            if (document.getElementById('result') !== undefined && document.getElementById('result') !== null) document.getElementById('result').innerHTML = 'Thank you for your ⚡️ payment! ✅';
            console.log('Paid! Attempt to stop polling');
            clearInterval(this.intervalId);
          }
        });
      } else {
        if (this.pollWaitDiv !== undefined) this.pollWaitDiv.innerHTML = ' (No longer checking for payments. Please click <a onClick="check_charge_id(\'' + this.chargeId + '\', (cidcb) => {if (cidcb.IsPaid === true) {document.getElementById(\'result\').innerHTML = \'Thank you for your ⚡️ payment! ✅ \'; } else { console.log(\'Still not paid. \'); } }); ">here</a> to manually check payments)';
        console.log("No longer polling because paid");
      }
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
