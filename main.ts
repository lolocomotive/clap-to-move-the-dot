/**
 * Clapping once moves the dot right
 * 
 * Clapping twice moves the dot left
 * 
 * Clap louder if it doesn't work
 * 
 * Only works with the microbit V2
 */
// Function is called when claps are detected
// Parameter cc : clap count
function onClap (cc: number) {
    if (cc == 1) {
        sprite.move(1)
    } else if (cc == 2) {
        sprite.move(-1)
    }
}
// The first two statements initialize the tab and line break variables to their respective values, which allows then to use these characters inside of the block based editor
let clockCycleCountDown = 0
let i = 0
let clapCount = 0
let sprite: game.LedSprite = null
let tab = "\t"
let lineBreak = "\n\r"
// The delay (in ms) inside of which two claps will be considered as double claps
let delayBetweenClaps = 250
// Initialize the communication with the computer to provide a lot of debug information
serial.redirectToUSB()
serial.writeString("" + (lineBreak))
// Print a nice message to welcome the user
serial.writeString("---------------------" + lineBreak)
serial.writeString("|     Welcome to    |" + lineBreak)
serial.writeString("| Micro:bit clapper |" + lineBreak)
serial.writeString("|    Version 0.34   |" + lineBreak)
serial.writeString("---------------------" + lineBreak)
// Indicate the features available in this version
serial.writeString("features:" + lineBreak)
serial.writeString("" + tab + "- Clap detection" + lineBreak)
serial.writeString("" + tab + "- Serial formatted output of all collected data" + lineBreak)
serial.writeString("" + tab + "- Detection of multiple claps" + lineBreak)
serial.writeString("" + tab + "- Move the dot right with one clap and left with 2 claps " + lineBreak)
// Initialize the dot that will be moved
sprite = game.createSprite(2, 2)
basic.forever(function () {
    let lastClapped = 0
    if (control.millis() - lastClapped > delayBetweenClaps) {
        // If the user has finished clapping
        if (clapCount > 0) {
            onClap(clapCount)
            clapCount = 0
        }
    }
    // Change this value to change the threshold
    if (input.soundLevel() > 100) {
        // If this is the first cycle of a clap, print a separator
        if (i == 0) {
            serial.writeString("====================" + lineBreak)
        } else {
            // Count down
            if (clockCycleCountDown != 0) {
                clockCycleCountDown += -1
            }
        }
        if (clockCycleCountDown == 0) {
            // The number of cycles which corresponds to the maximum length of the clap. This allows for longer sounds not to be considered as claps
            clockCycleCountDown = 5
            serial.writeString("Sound level:  ")
            serial.writeNumber(input.soundLevel())
            serial.writeString("" + (lineBreak))
        } else {
            clockCycleCountDown += -1
        }
        i += 1
    } else {
        // If a clap is detected
        if (i != 0) {
            clockCycleCountDown = 0
            // Print some debug information
            serial.writeString("---------------------" + lineBreak)
            serial.writeString("total clock cycles: ")
            serial.writeNumber(i)
            serial.writeString("" + (lineBreak))
            serial.writeString("total claps: ")
            serial.writeNumber(clapCount)
            serial.writeString("" + (lineBreak))
        }
        i = 0
    }
})
