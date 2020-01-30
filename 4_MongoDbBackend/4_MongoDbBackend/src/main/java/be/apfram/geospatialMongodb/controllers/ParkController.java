package be.apfram.geospatialMongodb.controllers;

import be.apfram.geospatialMongodb.ImagePAcket;
import be.apfram.geospatialMongodb.ResponsePacket;

import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.visual_recognition.v3.model.ClassifiedImages;
import com.ibm.watson.visual_recognition.v3.model.ClassifyOptions;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;

@RestController
@CrossOrigin
@RequestMapping("/test")
public class ParkController {


//    @GetMapping("")
//    public ResponsePacket findAllOrForName() {
//      return new ResponsePacket("hello world");
//    }

    @PostMapping("/image")
    public ResponsePacket getImage(@RequestBody ImagePAcket imageJson) {
        String linkToImage;

        System.out.println(imageJson.imageUrl);

        linkToImage = imageJson.imageUrl;

        IamAuthenticator authenticator = new IamAuthenticator("kMcZsUo8jrHd3jnZqyCmZXtllGl2ZUYNqvE7O0O_tMSQ");
        VisualRecognition visualRecognition = new VisualRecognition("2018-03-19", authenticator);

        ClassifyOptions classifyOptions = new ClassifyOptions.Builder()
                .url(linkToImage)
                .classifierIds(Collections.singletonList("food"))
                .build();
        ClassifiedImages result = visualRecognition.classify(classifyOptions).execute().getResult();
        System.out.println("\n******** Classify with the Food model ********\n" + result
                + "\n******** END Classify with the Food model ********\n");

        //return new ResponsePacket("got image");
        return new ResponsePacket(result);

  }

}
