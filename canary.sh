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
# Defaine your site
SITE="nolim1t.co and nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion"

cat >./canary.txt  <<EOF
I am the admin of ${SITE}. (${ADMIN}).
I am in control of my PGP key.
I will update this canary within 14 days.
This file can be accessed at /canary.txt

Today is ${DATE}

The current best bitcoin block hash:
${BLOCKHASH} (Block: ${BLOCKCOUNT})
EOF

gpg --clearsign ./canary.txt
echo "---" >> ./header.txt
echo "layout: null" >> ./header.txt
echo "permalink: /canary.txt" >> ./header.txt
echo "---" >> ./header.txt
echo "" >> ./header.txt

# Set up canary.txt
# Overwrite header
cat header.txt > ./canary.txt
# Move signed to canary.txt
cat ./canary.txt.asc >> ./canary.txt

# Cleanup
rm ./canary.txt.asc
rm ./header.txt
