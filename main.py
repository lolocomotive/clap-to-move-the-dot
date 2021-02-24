i = 0
lineBreak = "\n\r"
serial.redirect_to_usb()
serial.write_string("" + (lineBreak))
serial.write_string("---------------------" + lineBreak)
serial.write_string("|     Welcome to    |" + lineBreak)
serial.write_string("| Micro:bit clapper |" + lineBreak)
serial.write_string("|    Version 1.0    |" + lineBreak)
serial.write_string("---------------------" + lineBreak)

def on_forever():
    global i
    if input.sound_level() > 100:
        if i == 0:
            serial.write_string("---------------------" + lineBreak)
        led.plot(0, 0)
        i += 1
        serial.write_string("Sound level:  ")
        serial.write_number(input.sound_level())
        serial.write_string("" + (lineBreak))
    else:
        if i != 0:
            serial.write_string("---------------------" + lineBreak)
            serial.write_string("total clock cycles: ")
            serial.write_number(i)
            serial.write_string("" + (lineBreak))
        i = 0
        led.unplot(0, 0)
basic.forever(on_forever)
