/*
  Beta Lightning network addition
  // Mainnet: https://jenh8onnc8.execute-api.ap-southeast-1.amazonaws.com/awslightningmainnet1/generateinvoice
  // Testnet: https://ddanppib10.execute-api.us-east-2.amazonaws.com/awslightning1/generateinvoice
*/
const base_url = "https://jenh8onnc8.execute-api.ap-southeast-1.amazonaws.com/awslightningmainnet1/generateinvoice";
var traditionalPaymentURL = 'https://www.coinpayments.net/';
const check_btc_rates = (callback) => {
  axios.get(base_url + '?showRates=true').then((response) => {
    if (response.data !== undefined && response.data !== null) {
      if (response.data['status'] !== undefined && response.data['status'] !== null) {
        if (response.data['status'] === 200) {
          if (response.data['rates'] !== undefined && response.data['rates'] !== null) {
            callback({
              fetched: true,
              rates: response.data['rates']
            });
          } else {
            callback({
              fetched: false
            });
          }
        } else {
          callback({
            fetched: false
          });
        }
      } else {
        callback({
          fetched: false
        });
      }
    } else {
      callback({
        fetched: false
      });
    }
  });
};

const check_charge_id = (chargeId, callback) => {
  axios.get(base_url + '?checkCharge=true&chargeId=' + chargeId).then((response) => {
    if (response.data['response'] !== undefined) {
      if (response.data['response']['paid'] !== undefined) {
        var cbresp_charge = {
          chargeId: chargeId,
          IsPaid: response.data['response']['paid']
        };
        if (response.data['response']['lightning-pay-details'] !== undefined && response.data['response']['lightning-pay-details'] !== null) {
          cbresp_charge['lightning-pay-details'] = response.data['response']['lightning-pay-details'];
        }
        if (response.data['response']['paid'] === true) {
          callback(cbresp_charge);
        } else {
          callback(cbresp_charge);
        }
      } else {
        callback({
          chargeId: chargeId,
          IsPaid: false
        });
      }
    } else {
      callback({
        chargeId: chargeId,
        IsPaid: false
      });
    }
  }).catch(function (error) {
    // 31efWAGPj2WHvWSgapPE3bzmLAesC
    var error_charge = {
      chargeId: chargeId,
      IsPaid: false,
      error: true,
    };
    if (error.response.data['status'] !== undefined && error.response.data['status'] !== null) {
      if (error.response.data['status'] === 404) {
        error_charge['error_type'] = 'notexist'
        callback(error_charge);
      } else {
        error_charge['error_type'] = error.response.data['message'];
        callback(error_charge);
      }
    }
  });
}
const generateLNDTextArea = function(lndinvoice) {
  return "<textarea id='lndtextarea' cols='1' rows='5' style='width: 400px; height: 100px' onSelect='document.execCommand(\"copy\");' onClick='document.getElementById(\"lndtextarea\").select(); '>" + lndinvoice + "</textarea>";
}
const generateQRCode = function(lndinvoice) {
  return "<img src=\"https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=" + lndinvoice + "\" />";
}

var receiptId = ''; // Global
/*
  Lightning App
*/
var lnapp = new Vue({
  el: '#lnapp',
  data: {
    amount: '1',
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
  mounted: function() {
    console.log("lightning app initialized!");
    if (document.getElementById("paymentwidget") !== undefined && document.getElementById("paymentwidget") !== null) {
      console.log("Payment widget loaded!");
      if ((document.getElementById("submitbutton") !== undefined && document.getElementById("submitbutton") !== null) && (document.getElementById("descriptionform") !== undefined && document.getElementById("descriptionform") !== null)) {
        console.log("Adjust style")
        document.getElementById("descriptionform").style['margin-top'] = '5px';
        document.getElementById("submitbutton").style['margin-top'] = '5px';
      }
      if (document.getElementById("fiatcode") !== undefined && document.getElementById("fiatcode") !== null) {
        document.getElementById("fiatcode").style["width"] = '80px'; document.getElementById("fiatcode").style["margin-top"] = '5px';
      }
      if (document.getElementById('btcrates') !== undefined && document.getElementById('btcrates') !== null) {
        console.log("Loading BTC rates");
        check_btc_rates((btcratescb) => {
          console.log(btcratescb);
          var ratesHTML = '<p class="blurb">Please note, that our BTC Rate is <strong>$USDPRICE / €EURPRICE per BTC</strong></p>';
          if (btcratescb['rates'] !== undefined && btcratescb['rates'] !== null) {
            // USD Price
            if (btcratescb['rates']['USD'] !== undefined || btcratescb['rates']['USD'] !== null) {
              ratesHTML = ratesHTML.replace('USDPRICE', btcratescb['rates']['USD'].toString());
            } else {
              ratesHTML = ratesHTML.replace('USDPRICE', '---');
            }
            // EUR Price
            if (btcratescb['rates']['EUR'] !== undefined || btcratescb['rates']['EUR'] !== null) {
              ratesHTML = ratesHTML.replace('EURPRICE', btcratescb['rates']['EUR'].toString());
            } else {
              ratesHTML = ratesHTML.replace('EURPRICE', '---');
            }
            document.getElementById('btcrates').innerHTML = ratesHTML;
          }
        });
      }
    } else {
      console.log("Payment widget not loaded");
    }

    if (document.getElementById("receiptcheck") !== undefined && document.getElementById("receiptcheck") !== null) {
      console.log("Receipt check loaded!");
      document.getElementById("checkreceiptref").style['margin-top'] = '5px';
    } else {
      console.log("Receipt check not loaded!");
    }
  },
  methods: {
    generateInvoice: function () { // Generates BTC lightning invoice
      this.resultElement = document.getElementById('result');
      if (document.getElementById("amountinput") !== undefined && document.getElementById("amountinput") !== null) {
        if (document.getElementById("amountinput").value !== undefined && document.getElementById("amountinput").value !== null) {
          console.log("user filled in: " + document.getElementById("amountinput").value.toString());
          if (this.amount === undefined || this.amount === null) {
            console.log('setting this.amount to be the textbox value');
            this.amount = document.getElementById("amountinput").value;
          } else { // If this amount exists
            if (this.amount !== document.getElementById("amountinput").value) { // If the value is different
              console.log('Setting this.mount to be the new value set by javascript');
              this.amount = document.getElementById("amountinput").value;
            }
          } // End this.amount check
        }
      }
      if (parseFloat(this.amount) >= 0.005 && document.getElementById("descriptionform").value !== '') {
        // If description not empty and greator than half a cent
        this.resultElement.innerHTML = 'Amount is ' + this.amount.toString();
        var url = base_url + "?showInvoice=true&invoiceAmount=" + this.amount.toString() + "&invoiceDescription=" + encodeURIComponent(document.getElementById("descriptionform").value);
        this.resultElement.innerHTML = 'Fetching....';

        // If theres a fiatcode specified then set it
        if (document.getElementById("fiatcode") !== undefined && document.getElementById("fiatcode") !== null) {
          if (document.getElementById("fiatcode").value !== undefined && document.getElementById("fiatcode").value !== null) {
            if (document.getElementById("fiatcode").value.toString() === "USD" || document.getElementById("fiatcode").value.toString() === "EUR" || document.getElementById("fiatcode").value.toString() === "THB") {
              url = url + '&fiatCode=' + document.getElementById("fiatcode").value.toString();
            }
          }
        }

        // Hide form when submitted
        if (document.getElementById("fiatcode") !== undefined && document.getElementById("fiatcode") !== null) document.getElementById("fiatcode").style.display = 'none'; // Hide fiatcode
        if (document.getElementById("blurb") !== undefined && document.getElementById("blurb") !== null) document.getElementById("blurb").style.display = 'none'; //  Hide text
        if (document.getElementById("submitbutton") !== undefined) document.getElementById("submitbutton").style.display = 'none'; // hide submit button if exists
        if (document.getElementById("amountinput") !== undefined) document.getElementById("amountinput").style.display = 'none'; // hide amount if exists
        if (document.getElementById("descriptionform") !== undefined && document.getElementById("descriptionform") !== null) document.getElementById("descriptionform").style.display = 'none'; // Hide invoice description if exists
        if (document.getElementById("btcrates") !== undefined && document.getElementById("btcrates") !== null) document.getElementById("btcrates").style.display = 'none'; // Hide 'btcrates' if exist
        if (document.getElementById("like-button") !== undefined && document.getElementById("like-button") !== null) document.getElementById("like-button").style.display = 'none';
        if (document.getElementById("coffee-button") !== undefined && document.getElementById("coffee-button") !== null) document.getElementById("coffee-button").style.display = 'none';
        if (document.getElementById("love-button") !== undefined && document.getElementById("love-button") !== null) document.getElementById("love-button").style.display = 'none';

        axios.get(url).then((response) => {
          if (response.data.info['id'] !== undefined && response.data['lnd_payment_request'] !== undefined) {
            traditionalPaymentURL = traditionalPaymentURL + '/index.php?cmd=_pay&reset=1&merchant=b865a4c43872710001c9c2de4b17b8be&item_name=' + encodeURIComponent(document.getElementById("descriptionform").value) + '&amountf=' + (parseFloat(response.data['info']['amount']) / 100000000).toString() + '&quantity=1&allow_quantity=0&want_shipping=0&allow_extra=0&currency=BTC';
            // Generate Charge Info
            this.chargeId = response.data.info['id'];
            receiptId = this.chargeId.replace('ch_','');
            this.lndinvoice = response.data['lnd_payment_request'];
            this.pollCount = 1;
            this.paid = false;
            this.resultElement.innerHTML = '<div id="innerresult"><strong>Please pay the following Mainnet ⚡️ lightning Invoice (or if you do not use lightning yet, try <a href="' + traditionalPaymentURL + '" target="newwin">this link</a> for bitcoin or other crypto. Link opens in new window):</strong><span id="waitresults"></span><br />' + this.generateQRCode(response.data['lnd_payment_request']) + '<br />or copy the following payment request<br />' + this.generateLNDTextArea(response.data['lnd_payment_request']) + '</div><div id="reference">If you wish to manually check the payment status, quote payment reference <strong>' + receiptId + '</strong> to the admin</div>';
            this.pollWaitDiv = document.getElementById('waitresults');
            this.intervalId = setInterval(function () {
              console.log("Poll Job ID: " + this.intervalId.toString());
              if (this.pollCount >= this.maxpollIntervals || this.paid === true) {
                console.log("Cancel all waiting"); // If waiting timed out
                if (this.pollWaitDiv !== undefined && this.pollWaitDiv !== null) this.pollWaitDiv.innerHTML = ' (No longer checking for payments. Click <a onClick="document.getElementById(\'manualcheckstatus\').innerHTML = \'. Checking status...\'; check_charge_id(\'' + this.chargeId + '\', (cidcb) => {if (cidcb.IsPaid === true) {document.getElementById(\'result\').innerHTML = \'Thank you for your ⚡️ payment! ✅ <br />Should you require receipt verification please quote <strong>' + receiptId + '</strong> to the site admin. \'; } else { console.log(\'Still not paid. \'); document.getElementById(\'manualcheckstatus\').innerHTML = \'. Not Paid\'; } }); ">here</a> to manually check payment<span id="manualcheckstatus"></span>)';
                clearInterval(this.intervalId);
              } else {
                if (document.getElementById('waitresults')!== undefined && document.getElementById('waitresults') !== null) {
                  document.getElementById('waitresults').innerHTML = ' (Waiting for payment... )';
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
    generateLNDTextArea: generateLNDTextArea,
    generateQRCode: generateQRCode,
    pollPayment: function (chargeId) {
      console.log("Before running pollPayment: " + this.paid.toString());
      if (this.pollCount < this.maxpollIntervals || this.paid === true) { // Either max poll or paid
        console.log("checking for payments... (ID: " + this.intervalId.toString() + ")");
        this.pollCount += 1;
        check_charge_id(chargeId, function(callback) {
          if (callback['IsPaid'] == true) {
            this.paid = callback.IsPaid;
            if (document.getElementById('waitresults') !== undefined && document.getElementById('waitresults') !== null) document.getElementById('waitresults').innerHTML = '';
            if (document.getElementById('result') !== undefined && document.getElementById('result') !== null) document.getElementById('result').innerHTML = 'Thank you for your ⚡️ payment! ✅.<br />Should you require receipt verification please quote <strong>' + receiptId + '</strong> to the site admin. ';
            console.log('Paid! Attempt to stop polling');
            clearInterval(this.intervalId);
          }
        });
      } else { // If poll payment still runs and paid true (this block probably doesnt get executed)
        if (this.pollWaitDiv !== undefined) this.pollWaitDiv.innerHTML = ' (No longer checking for payments. Please click <a onClick="document.getElementById(\'manualcheckstatus\').innerHTML = \'. Checking status...\'; check_charge_id(\'' + this.chargeId + '\', (cidcb) => {if (cidcb.IsPaid === true) {document.getElementById(\'result\').innerHTML = \'Thank you for your ⚡️ payment! ✅<br />Should you require receipt verification please quote <strong>' + receiptId + '</strong> to the site admin. \'; } else { console.log(\'Still not paid. \'); } }); document.getElementById(\'manualcheckstatus\').innerHTML = \'. Not Paid\'; ">here</a> to manually check payments <span id="manualcheckstatus"></span>)';
        console.log("No longer polling because paid");
      }
    },
    checkreceipt: function() {
      if (document.getElementById('receiptresult') !== undefined && document.getElementById('receiptresult') !== null && document.getElementById('receiptrefinput') !== undefined && document.getElementById('receiptrefinput') !== null) {
        if (document.getElementById('receiptrefinput').value !== undefined && document.getElementById('receiptrefinput').value !== null && document.getElementById('receiptrefinput').value !== '') {
          check_charge_id('ch_' + document.getElementById('receiptrefinput').value.toString(), function(callback) {
            var friendlyPaymentStatus = 'Not Paid';
            if (callback.IsPaid === true) friendlyPaymentStatus = 'Paid';

            if (callback.error !== undefined && callback.error !== null) {
              if (callback.error === true) {
                friendlyPaymentStatus = ' Unspecified Error';
                if (callback['error_type'] !== undefined && callback['error_type'] !== null) {
                  if (callback['error_type'] === 'notexist') friendlyPaymentStatus = 'Receipt does not exist!';
                }
              }
            }
            document.getElementById('receiptresult').style['margin-top'] = '4px';
            if (callback['lightning-pay-details'] !== undefined && callback['lightning-pay-details'] !== null) {
              traditionalPaymentURL = traditionalPaymentURL + '/index.php?cmd=_pay&reset=1&merchant=b865a4c43872710001c9c2de4b17b8be&item_name=' + encodeURIComponent(callback['lightning-pay-details']['description']) + '&amountf=' + (parseFloat(callback['lightning-pay-details']['amount']) / 100000000).toString() + '&quantity=1&allow_quantity=0&want_shipping=0&allow_extra=0&currency=BTC';
              document.getElementById('receiptresult').innerHTML = 'The receipt reference <strong>' + document.getElementById('receiptrefinput').value.toString() + '</strong> details are as follows: <br /><strong>Payment Status: </strong>' + friendlyPaymentStatus + '<br /><strong>Amount</strong>: ' + callback['lightning-pay-details']['amount'] + ' シ (satoshis) or ' + (parseFloat(callback['lightning-pay-details']['amount']) / 100000000) + ' BTC (you may pay for this in mainnet or other crypto <a href="' + traditionalPaymentURL + '">here</a>)<br /><strong>Lightning Invoice: </strong><br />' + generateLNDTextArea(callback['lightning-pay-details']['payment_request']) + '<br />' + generateQRCode(callback['lightning-pay-details']['payment_request']);
            } else {
              document.getElementById('receiptresult').innerHTML = 'The receipt reference <strong>' + document.getElementById('receiptrefinput').value.toString() + '</strong> details are as follows: <br /><strong>Payment Status: </strong>' + friendlyPaymentStatus;
            }

          });
        }
      }
    }
  } // End Methods in vue.js object
}); // End VUE.js

function toggleLNPay() {
  if (document.getElementById("like-button") !== undefined && document.getElementById("like-button") !== null && document.getElementById("submitbutton") !== undefined && document.getElementById("submitbutton") !== null) {
    document.getElementById("like-button").style['margin-top'] = '5px';
    document.getElementById("submitbutton").style['margin-top'] = '5px'
  }
  if (document.getElementById("fiatcode") !== undefined && document.getElementById("fiatcode") !== null) {
    document.getElementById("fiatcode").style["width"] = '80px'; document.getElementById("fiatcode").style["margin-top"] = '5px';
  }

  if (document.getElementById('lnpay').style.visibility == 'hidden') {
    document.getElementById('lnpay').style.visibility = 'visible';
  } else {
    document.getElementById('lnpay').style.visibility = 'hidden';
  }
}
