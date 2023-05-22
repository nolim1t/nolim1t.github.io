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

cat >./lightning-nodes.txt  <<EOF
I am the owner of the following lightning nodes:

nlt hub (DECOMMISSIONED)
https://amboss.space/node/027cf9967a2d79631c665417b363d7113764bdede6c7bc21897062655448cd3581



PGP Keys you may use
https://nolim1t.co/key/pgpkey.asc.txt

Today is ${DATE}

The current best bitcoin block hash:
${BLOCKHASH} (Block: ${BLOCKCOUNT})
EOF

gpg --local-user F6287B82CC84BCBD --clearsign ./lightning-nodes.txt
echo "---" >> ./header.txt
echo "layout: null" >> ./header.txt
echo "permalink: /lightning-nodes.txt" >> ./header.txt
echo "---" >> ./header.txt
echo "" >> ./header.txt

cat header.txt > ./lightning-nodes.txt
cat ./lightning-nodes.txt.asc >> ./lightning-nodes.txt

# Cleanup
rm ./lightning-nodes.txt.asc
rm ./header.txt
