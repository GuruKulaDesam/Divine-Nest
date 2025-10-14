#!/bin/bash
echo "Setting Java 17 for Android build..."
export JAVA_HOME="/c/Users/$USER/java17/jdk-17.0.12+7"
export PATH="$JAVA_HOME/bin:$PATH"
echo "JAVA_HOME set to: $JAVA_HOME"
java -version
echo ""
echo "Starting Android build..."
cd android
./gradlew build