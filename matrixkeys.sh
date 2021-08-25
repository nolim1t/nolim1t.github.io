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

Desktop Client (@nolim1t:matrix.org)
Session ID: HVITNQHIAC
Session key:    9W5O EEzt V9a1 pVzE 0Dk+ 5LSJ DUN9 bW3S R9qS 7rDb kxc

Web Client (@nolim1t@converser.eu)
Session ID:TSHTWVGGKV
Session key:bMZ7 FEbz +1Ye 7yAv XNhU Kqzj B/+Y W6HC 7eyw KpNQ Bzw

Fluffy Chat Main Phone (@nolim1t:converser.eu)
Session ID: ODTYIVYFEP
Session Key: s2Rl ihJs h3xl M8Fu zxyN 8dQM vcR2 GJp8 SfFw fKue TuE

Fluffy Chat Secondary Main Phone: (@nolim1t:converser.eu)
Session ID: DUFBRXGZYZ
Session Key: Xp5U IKYT NKo9 7fFE 0aKq Rq4D aCOV h+2G ZHqh BZdq mo0

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
