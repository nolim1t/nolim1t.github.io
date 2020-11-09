# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# This is the gohttpd server
APISERVER="http://localhost:6969/api/"
BLOCKHASH=`curl "${APISERVER}getblockhash" 2>/dev/null | jq .blockhash | sed 's/\"//g;'`
DATE=`date +"%Y-%m-%d"`
ADMIN="@nolim1t"
SITE="nolim1t.co and nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion"

cat <<EOF
I am the admin of ${SITE}. (${ADMIN}).
I am in control of my PGP key.
I will update this canary within 14 days.
This file can be accessed at /canary.txt

Today is ${DATE}
Best bitcoin block hash:
${BLOCKHASH}

EOF
