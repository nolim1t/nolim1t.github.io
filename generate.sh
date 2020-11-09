#!/bin/bash
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

./canary.sh > ./canary.txt
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

