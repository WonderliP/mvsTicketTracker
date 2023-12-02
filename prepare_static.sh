BOOKMARKLET_DIR_PATH="./scripts-bookmark/addReact"
STATIC_HTML_DIR_PATH="./static"

BOOKMARKLET_CONTENT=$(cat ${BOOKMARKLET_DIR_PATH}/addReact.js | tr -s '\n' ' ')
HTML_FILE="${STATIC_HTML_DIR_PATH}/help.html"

echo $BOOKMARKLET_CONTENT
echo $HTML_FILE



sed -i "s#__SCRIPT_CONTENT__#${BOOKMARKLET_CONTENT}#g" "$HTML_FILE.copy"
