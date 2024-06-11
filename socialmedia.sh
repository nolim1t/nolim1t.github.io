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

PGP
f6287b82CC84bcbd (or https://nolim1t.co/f6287b82CC84bcbd.asc.txt)

Nostr Public Key
Hex
146bda4ec6932830503ee4f8e8b626bd7b3a5784232b8240ba15c8cbff9a07cd
Non Hex
npub1z34a5nkxjv5rq5p7unuw3d3xh4an54uyyv4cys96zhyvhlu6qlxs4qnh9r
Link
https://snort.social/p/npub1z34a5nkxjv5rq5p7unuw3d3xh4an54uyyv4cys96zhyvhlu6qlxs4qnh9r

Simplex.chat
https://simplex.chat/contact#/?v=2-4&smp=smp%3A%2F%2FenEkec4hlR3UtKx2NMpOUK_K4ZuDxjWBO1d9Y4YXVaA%3D%40smp14.simplex.im%2F_lmteZ1lEkwRPrLiF1xxjGWfoAIL36H3%23%2F%3Fv%3D1-2%26dh%3DMCowBQYDK2VuAyEAHwIAL-HqwUMW6Ab26K6JXUFIfMVjmAIN0jAvGL_Yw24%253D%26srv%3Daspkyu2sopsnizbyfabtsicikr2s4r3ti35jogbcekhm3fsoeyjvgrid.onion

Paynym
+emptywaterfall024

LN address
nolim1t@getalby.com
f6287b82CC84bcbd@stacker.news
nolim1t@zbd.gg

Telegram
https://t.me/nolim1t (Read only with commenting)

Instagram
https://instagram.com/nolim1t

Tiktok
https://www.tiktok.com/@69420hashespersecond

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
