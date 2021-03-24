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

cat >./socialmedia.txt  <<EOF
I am the owner of the following profiles:

Matrix
@nolim1t:matrix.org

Sphinx Chat
02e64be984a252d82d71a84f0f2bb8be375207a0862e827dacb290977eca84078f

Mastodon
https://bitcoinhackers.org/@nolim1t (Main)
https://bitcoinersagainst.boats/@nolim1t (Backup)

Twitter
https://twitter.com/nolim1t

Telegram
https://t.me/nolim1tcoblog (Read only)

Web (Curated)
https://nolim1t.co 
http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion

PGP Key
https://nolim1t.co/key/pgpkey.asc.txt
http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/key/pgpkey.asc.txt

Today is ${DATE}

The current best bitcoin block hash:
${BLOCKHASH} (Block: ${BLOCKCOUNT})
EOF

gpg --local-user F6287B82CC84BCBD --clearsign ./socialmedia.txt
echo "---" >> ./header.txt
echo "layout: null" >> ./header.txt
echo "permalink: /socialmedia.txt" >> ./header.txt
echo "---" >> ./header.txt
echo "" >> ./header.txt

cat header.txt > ./socialmedia.txt
cat ./socialmedia.txt.asc >> ./socialmedia.txt

# Cleanup
rm ./socialmedia.txt.asc
rm ./header.txt
