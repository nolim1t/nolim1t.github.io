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
Matrix
@nolim1t:matrix.org

My device keys are as follows:

Mac Brave Browser:
Session ID: OOPYKODQSM
Session key:    7PSm a8Me aTUc 9y4Q p5Dw v8ZL EWKr v8i4 Wh5z 1weH TsU

Phone (Main):
Session ID:YRCIRYLPIN
Session Key: 7K3C acQk reZF mlJ9 bOp7 DvZx kcE+ uLYN zhru cIP5 5Ho

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
