const sampleCommentData = {
    "kind": "youtube#commentThreadListResponse",
    "etag": "bDk1k-hLWQ6IjSPYreRwn0XS_dg",
    "nextPageToken": "QURTSl9pMkhHeFVPbktuVG9FcWFzbE9NaXhxcFV3MG00d0RvX1ZkdUx5M05wQkxudEQ2V0pnOVUxWDc1bXlwclRFOFh0WENoUHFWbUNTVQ==",
    "pageInfo": {
      "totalResults": 20,
      "resultsPerPage": 20
    },
    "items": [
      {
        "kind": "youtube#commentThread",
        "etag": "QvzVVq3OJeJIy0rJuANJ6YJE79I",
        "id": "UgzrML-NiAoU3IJZaUB4AaABAg",
        "snippet": {
          "videoId": "tlCKZF8b768",
          "topLevelComment": {
            "kind": "youtube#comment",
            "etag": "qT63vEcuV6kkImQS2eytZbcBR44",
            "id": "UgzrML-NiAoU3IJZaUB4AaABAg",
            "snippet": {
              "videoId": "tlCKZF8b768",
              "textDisplay": "kat gostosa",
              "textOriginal": "kat gostosa",
              "authorDisplayName": "TT",
              "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AGIKgqNnnICHgxKlpPHrxqN6CaUhOEDx2wXSIH1iHVDemw=s48-c-k-c0x00ffffff-no-rj",
              "authorChannelUrl": "http://www.youtube.com/channel/UCt15jwfuWmkIZE1jJVc873w",
              "authorChannelId": {
                "value": "UCt15jwfuWmkIZE1jJVc873w"
              },
              "canRate": true,
              "viewerRating": "none",
              "likeCount": 0,
              "publishedAt": "2023-04-14T02:38:12Z",
              "updatedAt": "2023-04-14T02:38:12Z"
            }
          },
          "canReply": true,
          "totalReplyCount": 0,
          "isPublic": true
        }
      },
      {
        "kind": "youtube#commentThread",
        "etag": "E1OngpDAZyGwp7y4men_-lkpYvQ",
        "id": "UgztGyPJJros1liDAn54AaABAg",
        "snippet": {
          "videoId": "tlCKZF8b768",
          "topLevelComment": {
            "kind": "youtube#comment",
            "etag": "ofFb27E22iFxt1l8m4QoKmTrKJ0",
            "id": "UgztGyPJJros1liDAn54AaABAg",
            "snippet": {
              "videoId": "tlCKZF8b768",
              "textDisplay": "다른채널들은 광고x라면서 광고 나오는데 여긴아니네요 ㅎㅎ",
              "textOriginal": "다른채널들은 광고x라면서 광고 나오는데 여긴아니네요 ㅎㅎ",
              "authorDisplayName": "구글다리우스",
              "authorProfileImageUrl": "https://yt3.ggpht.com/f8LmkEm-DpYsiNApEQ_m_ZvzGr_30YXXRbsMXtntvCa_RKbLz1MHfTLScIJpoSl7DHUkcwgGBA=s48-c-k-c0x00ffffff-no-rj",
              "authorChannelUrl": "http://www.youtube.com/channel/UCOV4KBvA8D2OaV77euZoQrQ",
              "authorChannelId": {
                "value": "UCOV4KBvA8D2OaV77euZoQrQ"
              },
              "canRate": true,
              "viewerRating": "none",
              "likeCount": 0,
              "publishedAt": "2023-03-27T12:16:09Z",
              "updatedAt": "2023-03-27T12:16:09Z"
            }
          },
          "canReply": true,
          "totalReplyCount": 0,
          "isPublic": true
        }
      }
    ]
  }


const childCommentData = {
  "kind": "youtube#commentListResponse",
  "etag": "lJUYCTdDpjoXmHYpN0cDFZOpB4s",
  "pageInfo": {
    "resultsPerPage": 20
  },
  "items": [
    {
      "kind": "youtube#comment",
      "etag": "5gsaFSc0sA9pFKF7Ax5dMLALKhk",
      "id": "Ugzhth98fwtHES0Opfx4AaABAg.8qS20Zm027f9pB1MvWfJFB",
      "snippet": {
        "textDisplay": "we do",
        "textOriginal": "we do",
        "parentId": "Ugzhth98fwtHES0Opfx4AaABAg",
        "authorDisplayName": "Inesh lutchmee",
        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AGIKgqOGQgRGtuPjI-ZaOMRl1AyDi_dNND7I-KN7oss=s48-c-k-c0x00ffffff-no-rj",
        "authorChannelUrl": "http://www.youtube.com/channel/UC1--_Vn9rNmpYyZ1DBkQ2qg",
        "authorChannelId": {
          "value": "UC1--_Vn9rNmpYyZ1DBkQ2qg"
        },
        "canRate": true,
        "viewerRating": "none",
        "likeCount": 0,
        "publishedAt": "2023-05-01T18:53:57Z",
        "updatedAt": "2023-05-01T18:53:57Z"
      }
    },
    {
      "kind": "youtube#comment",
      "etag": "RTz07v2imv9j4h6W_VN5bErL_C0",
      "id": "Ugzhth98fwtHES0Opfx4AaABAg.8qS20Zm027f9o-U8sEbybU",
      "snippet": {
        "textDisplay": "me too",
        "textOriginal": "me too",
        "parentId": "Ugzhth98fwtHES0Opfx4AaABAg",
        "authorDisplayName": "Insalata Russa",
        "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AGIKgqPn_3N3I2NqxFD2_wA6Ef5yrDZvRhmQM-6n-KKZ_L-K01scmEaVDhZT1KfKLfAu=s48-c-k-c0x00ffffff-no-rj",
        "authorChannelUrl": "http://www.youtube.com/channel/UCe-v4VJyJofjPdzOuAKT67g",
        "authorChannelId": {
          "value": "UCe-v4VJyJofjPdzOuAKT67g"
        },
        "canRate": true,
        "viewerRating": "none",
        "likeCount": 0,
        "publishedAt": "2023-04-02T10:43:10Z",
        "updatedAt": "2023-04-02T10:43:10Z"
      }
    },
    {
      "kind": "youtube#comment",
      "etag": "tIHbSXtyeKWRk5zE7wxluUAMcug",
      "id": "Ugzhth98fwtHES0Opfx4AaABAg.8qS20Zm027f9ninUk2qFw2",
      "snippet": {
        "textDisplay": "Guggggg",
        "textOriginal": "Guggggg",
        "parentId": "Ugzhth98fwtHES0Opfx4AaABAg",
        "authorDisplayName": "Car audio",
        "authorProfileImageUrl": "https://yt3.ggpht.com/swnuFsaFnm74WtReuSVRwuQpNbhs3N_cv-wQo3yQQiA_3EB-PVgywsAEqkHBm-Z97r9PFSLN=s48-c-k-c0x00ffffff-no-rj",
        "authorChannelUrl": "http://www.youtube.com/channel/UCelUs3Np6_7MFq78HSpEowA",
        "authorChannelId": {
          "value": "UCelUs3Np6_7MFq78HSpEowA"
        },
        "canRate": true,
        "viewerRating": "none",
        "likeCount": 0,
        "publishedAt": "2023-03-26T13:54:35Z",
        "updatedAt": "2023-03-26T13:54:35Z"
      }
    },
    {
      "kind": "youtube#comment",
      "etag": "f5udCuZpq5b2QXrRsT0wZXtNLso",
      "id": "Ugzhth98fwtHES0Opfx4AaABAg.8qS20Zm027f9nGoS8RlHxW",
      "snippet": {
        "textDisplay": "Hii",
        "textOriginal": "Hii",
        "parentId": "Ugzhth98fwtHES0Opfx4AaABAg",
        "authorDisplayName": "WARNER ARMY",
        "authorProfileImageUrl": "https://yt3.ggpht.com/JgQE_bJCh5xlqNNMz7AJvU3cfx-3NaYU1y04kpNf3tQUN6vYji6KiBchSw-dDLPJ18STMJ7wnA=s48-c-k-c0x00ffffff-no-rj",
        "authorChannelUrl": "http://www.youtube.com/channel/UCOKW4u_uhDBFuOO1wykahjQ",
        "authorChannelId": {
          "value": "UCOKW4u_uhDBFuOO1wykahjQ"
        },
        "canRate": true,
        "viewerRating": "none",
        "likeCount": 0,
        "publishedAt": "2023-03-15T07:44:59Z",
        "updatedAt": "2023-03-15T07:44:59Z"
      }
    }

  ],
  "nextPageToken": "R0FJeVZnbzBJT3p2aExYcWlvQURNaWtRQUJqYnYtQ2Y2TUQ3QWlBQktBTXdDam9XT0hGVE1qQmFiVEF5TjJZNWFXbE5SRXgzVWxsVFNoSWVDQVVTR2xWbmVtaDBhRGs0Wm5kMFNFVlRNRTl3Wm5nMFFXRkJRa0ZuT2lBSUFSSWNOVHBWWjNwb2RHZzVPR1ozZEVoRlV6QlBjR1o0TkVGaFFVSkJadw=="
}