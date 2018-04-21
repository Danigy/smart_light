#define LIGHT_PIN 8
unsigned long timingTemperature;

void setup() {
  Serial.begin(9600);
  pinMode(LIGHT_PIN, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    if (Serial.read() == 49)
      digitalWrite(LIGHT_PIN, HIGH);
    else 
      digitalWrite(LIGHT_PIN, LOW);
  }
  
  if ( (millis() - timingTemperature) > 1000) {
    timingTemperature = millis();
    Serial.print("{\"temperature\":\"");
    Serial.print(random(0, 40));
    Serial.println("\"}");
  }

}