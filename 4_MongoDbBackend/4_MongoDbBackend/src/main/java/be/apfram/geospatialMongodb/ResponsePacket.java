package be.apfram.geospatialMongodb;

import com.ibm.watson.visual_recognition.v3.model.ClassifiedImages;

public class ResponsePacket {
    public ClassifiedImages image;

    public ResponsePacket() {
    }

    public ResponsePacket(ClassifiedImages image) {
        this.image = image;
    }
}
