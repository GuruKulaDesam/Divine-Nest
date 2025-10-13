echo "JAVA_HOME set to $JAVA_HOME"
# Set JAVA_HOME to Oracle JDK 17 for this terminal session
export JAVA_HOME="/c/Program Files/Java/jdk-17"
# Remove all other Java from PATH (optional, for this session only)
PATH_CLEANED=$(echo "$PATH" | tr ':' '\n' | grep -viE 'java|jdk|openjdk' | paste -sd: -)
export PATH="$JAVA_HOME/bin:$PATH_CLEANED"

echo "JAVA_HOME set to $JAVA_HOME"
echo "PATH is now: $PATH"
echo "Which java: $(which java)"
java -version
