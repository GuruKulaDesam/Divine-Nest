@echo off
echo Setting Java 17 for Android build...
echo Using system Java 17...
java -version
echo.
echo Starting Android build...
cd android
call gradlew clean
if "%1"=="release" (
    echo Building release APK...
    call gradlew assembleRelease
) else if "%1"=="debug" (
    echo Building debug APK...
    call gradlew assembleDebug
) else (
    echo Building full project...
    call gradlew build
)
echo.
echo Build completed!