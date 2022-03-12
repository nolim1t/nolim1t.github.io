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

nlt hub
https://amboss.space/node/027cf9967a2d79631c665417b363d7113764bdede6c7bc21897062655448cd3581

nlt sphinx
https://amboss.space/node/03c81224383d7063ce859f8dd55a70546e0ca1beae70e406f9aba46ad6cfd80a19

Chiang Mai nodes

AirDeveloppa co th.
https://amboss.space/node/034b450402ad76d02586883ba61eadd5368cd2ae132e9090918d5c1e5c0c3376d6

Burrito Squad / Corner Bistro
https://amboss.space/node/02a6ae00f1e658e23447b5fd3a03acc42ddd0e80350ce4fc02ee33bffc095d0187


Watchtowers run by me
02426142a3724b1c4e08f74f2995514bf5a83d8ceeee1db05cb15e749f543bf4c3@jc7bpbggvkiakcbcjo6gp3d6aaqjmn3wtrf4h2j5dbd7ba2ke7zw7aqd.onion:9911 (recommended)
0293d642f22a1838f0238894a5ed0600629010d772ff66d4cd26e3ac850b56b985@mwd3ssxb73egp2z3oo6k7q4qdm6ne245lsci7uc6slje6slintdgpeid.onion:9911 (backup)


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
