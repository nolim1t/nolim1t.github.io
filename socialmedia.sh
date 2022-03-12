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
@nolim1t:matrix.nolim1t.co (Because sovereignty rocks!)
@nolim1t:converser.eu (Because decentralization - currently down)
#thebarrenschat:matrix.nolim1t.co (General real time chatroom)

Briar Add Key (Add from distance)
briar://acv2wg7e35tcyv7ktmefkbu5xfcfjntgwfwec3grz5zxkuojxt6ts

Sphinx Chat Public key
03c81224383d7063ce859f8dd55a70546e0ca1beae70e406f9aba46ad6cfd80a19

Nostr Public Key
146bda4ec6932830503ee4f8e8b626bd7b3a5784232b8240ba15c8cbff9a07cd

Nostr Urls
https://nostr.rocks/146bda4ec6932830503ee4f8e8b626bd7b3a5784232b8240ba15c8cbff9a07cd
https://nostr.com/146bda4ec6932830503ee4f8e8b626bd7b3a5784232b8240ba15c8cbff9a07cd

Mastodon
https://bitcoinhackers.org/@nolim1t (Main)
https://bitcoinersagainst.boats/@nolim1t (Backup)

Gettr (Twitter replacement)
https://gettr.com/user/nolim1t

Twitter
https://twitter.com/nolim1t

Minds
https://www.minds.com/nolim1t/

Telegram
https://t.me/nolim1t (Read only with commenting)
https://t.me/nolim1tcoblog (Archived blog)

Discord (nolim1t#2650)
https://discord.gg/Vnt7Nd9wzs

Web (Curated)
https://nolim1t.co

PGP Key
https://nolim1t.co/key/pgpkey.asc.txt

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
