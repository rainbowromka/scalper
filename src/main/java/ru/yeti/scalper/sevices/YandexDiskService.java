package ru.yeti.scalper.sevices;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;

@Service
public class YandexDiskService
{
    private static final String token = "y0__xDn3tGiARjAjzcgrd-t7hKd_MHuyfpON65a5duUvljwvFG_Jg";

    RestTemplate restTemplate;

    public YandexDiskService(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
    }

    public void upload(InputStream is, String fullFilename) throws IOException
    {
        final String basUrl = "https://cloud-api.yandex.net/v1/disk/resources/upload";

        RequestEntity<Void> requestEntity = RequestEntity.get(
                UriComponentsBuilder.fromUriString(basUrl)
                    .queryParam("path", fullFilename)
                    .build()
                    .toUri()
            ).header("Authorization", "OAuth " + token)
            .build();

        ResponseEntity<Link> linkResponseEntity = restTemplate
            .exchange(requestEntity, Link.class);

        String link = linkResponseEntity.getBody().href();

        RequestEntity<byte[]> requestToUpload = RequestEntity.put(
            UriComponentsBuilder.fromUriString(link)
            .build()
            .toUri()
        ).body(new byte[is.available()]);

        ResponseEntity<String> responseToUpload = restTemplate.exchange(
            requestToUpload, String.class);

        if (responseToUpload.getStatusCode().is2xxSuccessful()) {
            System.out.println("File is uploaded successfully");
        } else {
            System.out.println(responseToUpload.getBody() + " | "
                + responseToUpload.getStatusCode());
        }
    }

    public void createDirectory(String path)
    {
        final String baseUrl = "https://cloud-api.yandex.net/v1/disk/resources";

        RequestEntity<Void> requestEntity = RequestEntity.put(
            UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("path", path)
                .build().toUri()
            )
            .header("Authorization", "OAuth " + token)
            .build();

        try {
            ResponseEntity<String> exchange = restTemplate.exchange(
                requestEntity, String.class);
            HttpStatusCode statusCode = exchange.getStatusCode();
            if (statusCode.equals(HttpStatusCode.valueOf(201)))
            {
                System.out.println("Successfully created folder: " + path);
            }
        } catch (Exception e) {
            System.out.println("Folder already exists: " + e.getMessage());
        }
    }

    public String download(String path) throws IOException {
        final String baseUrl = "https://cloud-api.yandex.net/v1/disk/resources/download";
        RequestEntity<Void> requestEntity = RequestEntity.get
            (UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("path", path)
                .build().toUri()
            )
            .header("Authorization", "OAuth " + token)
            .build();

        ResponseEntity<Link> response = restTemplate.exchange(
            requestEntity, Link.class);
        if (!response.getStatusCode().equals(HttpStatusCode.valueOf(200))) {
            throw new IOException("Error during getting link");
        }

        return response.getBody().href();
    }

//    https://youtu.be/cqCJHRf9lKM?si=hBykMPtC4ze2S-kB&t=1313

//    @AllArgsConstructor
//    @Getter
//    final class Link {
//        private final String href;
//        private final String method;
//        private final boolean templated;
//    }
    public record Link(String href, String method, boolean templated)
    {
    }
}
