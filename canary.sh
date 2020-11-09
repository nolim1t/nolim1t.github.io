APISERVER="http://localhost:6969/api/"
BLOCKHASH=`curl "${APISERVER}getblockhash" 2>/dev/null | jq .blockhash | sed 's/\"//g;'`
DATE=`date +"%Y-%m-%d"`
ADMIN="@nolim1t"
SITE="nolim1t.co and nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion"

cat <<EOF
I am the admin of ${SITE}. (${ADMIN})
I am in control of my PGP key
I will update this canary within 14 days

Today is ${DATE}
Best bitcoin block hash:
${BLOCKHASH}

EOF
