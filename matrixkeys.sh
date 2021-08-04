# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# This is the gohttpd server
# https://gitlab.com/nolim1t/golang-httpd-test

APISERVER="http://localhost:6969/api/"
BLOCKHASH=`curl "${APISERVER}getblockhash" 2>/dev/null | jq .blockhash | sed 's/\"//g;'`
BLOCKCOUNT=`curl "${APISERVER}blocks" 2>/dev/null | jq .count`
DATE=`date +"%Y-%m-%d"`
ADMIN="@nolim1t"

cat >./matrixkeys.txt  <<EOF
My device keys are as follows:

Mobile Client (@nolim1t:matrix.org)
Session ID: GPOXMNETXX
Session key:
7qWl SvVB XrXF 1Xz6 9nAC g7Rx NyPm 2Ln9 mBKr qtoB WUQ

Mac Client (@nolim1t:matrix.org)
Session ID: HVITNQHIAC
Session key:    9W5O EEzt V9a1 pVzE 0Dk+ 5LSJ DUN9 bW3S R9qS 7rDb kxc

Firefox Linux (@nolim1t:matrix.org)
Session ID: CIOUFWHAHZ
Session Key: ztja gzSi ynLj 5Fdt kW3L fFBV Ny9L gzpt 25jt IBWu zfg

Android Client (@nolim1t:matrix.org)
Session Id: UUCZTIOVWQ
Session key: AjaW kKtB UGG5 FIiZ jry8 OR8t xaVo XqfY elOM t2A3 SMk

iOS Client (@nolim1t:converser.eu)
Session ID: QAPFYQCOQF
Session key:
w+Ed 3up/ i4dq u6hu ozBT UQQK ZEhd crRB Y4EP 00F8 roc

Web Client (@nolim1t@converser.eu)
Session ID:TSHTWVGGKV
Session key:bMZ7 FEbz +1Ye 7yAv XNhU Kqzj B/+Y W6HC 7eyw KpNQ Bzw

Today is ${DATE}

The current best bitcoin block hash:
${BLOCKHASH} (Block: ${BLOCKCOUNT})
EOF

gpg --local-user F6287B82CC84BCBD --clearsign ./matrixkeys.txt
echo "---" >> ./header.txt
echo "layout: null" >> ./header.txt
echo "permalink: /matrixkeys.txt" >> ./header.txt
echo "---" >> ./header.txt
echo "" >> ./header.txt

cat header.txt > ./matrixkeys.txt
cat ./matrixkeys.txt.asc >> ./matrixkeys.txt

# Cleanup
rm ./matrixkeys.txt.asc
rm ./header.txt
