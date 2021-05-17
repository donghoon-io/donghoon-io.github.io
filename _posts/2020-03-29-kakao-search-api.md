---
title: "Swift에서 Kakao rest API를 이용하여 이미지 검색 기능 추가하기"
excerpt: "난이도: ★★★★☆"
slug: "swift_image_search"
date: 2020-03-29 10:00:00 +0900
layout: post
category: development
lang: en
tags:
    - swift
    - iOS
    - xcode
---

## 오늘의 목표

- Kakao의 Rest API를 추가하기
- Rest API를 이용하여, 이미지 검색 기능 추가하기
- 간단한 JSON, Alamofire 기능 알아보기


앱을 개발하면서, 가끔 인터넷 상의 이미지를 불러와야 하는 경우가 생긴다. Google, Bing은 각각 API를 제공하지만, 이는 유료인데다 쿼리당 가격이 꽤 비싸서 부담이 된다. 그렇다고 html을 직접 손대서 하기에는 위험 부담이 따른다. 그러던 와중에, 카카오에서 제공하는 '무료' API를 알게되었고, 게다가 초당 쿼리수 제한이나 하루 사용량도 없다...!
오늘은 카카오의 이 API를 이용하여 검색 기능을 추가하는 방법을 알아보도록 한다.

## 방법
먼저 Cocoapods 등으로 SwiftyJSON, Alamofire을 추가해준다. SwiftyJSON은 Swift에서 JSON을 쉽게 다룰 수 있게 하는 라이브러리고, Alamofire은 http 접속을 용이하게 하는 라이브러리다.

```python
target 'projectName' do
  use_frameworks!
  pod 'SwiftyJSON', '~> 4.0'
  pod 'Alamofire', '~> 4.7'
end
```

그 다음, 오른쪽 Kakao API 링크에 들어가서 Key를 발급받는다. [Kakao Developers](https://developers.kakao.com/)
개발자 등록을 하면 4개의 API Key가 나오는데, 이 중에서 Rest API에 해당하는 것을 복사해둔다.
그 다음, 아래 코드의 `\(Secret.key)` 부분에 붙여넣는다.
주의할 점은, 키를 복사-붙여넣기할 곳 앞에 있는 `KakaoAK`를 절대 지우지 않아야 한다!

## Code


```swift

import Alamofire
import SwiftyJSON

func searchKeyword(keyword: String, index: Int, completion: @escaping (UIImage) -> Void) {
    let escapedString = keyword.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!
    let strUrl = "https://dapi.kakao.com/v2/search/image?query=\(escapedString)"
    Alamofire.request(strUrl, method: .get, encoding: JSONEncoding.prettyPrinted, headers: ["Authorization": "KakaoAK \(Secret.key)"]).responseJSON { (response) in
        if response.result.isSuccess {
            let searchResult: JSON = JSON(response.result.value!)
            let imageResult = searchResult["documents"][index]["image_url"].string!
            let encodedResult = imageResult.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
            Alamofire.request(encodedResult).responseData(completionHandler: { (response) in
                if response.result.isSuccess {
                    let image = UIImage(data: response.result.value!)
                    completion(image ?? UIImage())
                } else {
                    print("Image Load Failed! \(response.result.error ?? "error" as! Error)")
                }
            })
        } else {
            print("Kakao Search Failed! \(response.result.error ?? "error" as! Error)")
        }
    }
}
```

## 결과
`CollectionView를 만들고, "라면"이라는 키워드를 넣었을 때`
![ramen](/assets/images/posts/ramen.png)
