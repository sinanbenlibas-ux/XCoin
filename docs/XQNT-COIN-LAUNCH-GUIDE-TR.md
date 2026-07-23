# XQNT Coin Çıkarma ve Lansman Rehberi

> Durum: Website yayında, token henüz çıkarılmadı.  
> Son güncelleme: 23 Temmuz 2026  
> Uyarı: Bu belge hukuki, vergi veya yatırım tavsiyesi değildir. Ana ağda
> kontrat yayımlamadan, satış yapmadan veya likidite eklemeden önce seçilen
> ülkede yetkili bir hukukçu ve mali müşavirle yazılı değerlendirme yapılmalıdır.

Bu belge XQNT Coin’i güvenli, doğrulanabilir ve mümkün olduğunca düşük maliyetli
şekilde çıkarmak için takip edeceğimiz sırayı tanımlar. Her aşamanın sonunda bir
“geçiş koşulu” vardır. O koşul tamamlanmadan sonraki aşamaya geçilmez.

## 0. Bugünkü doğrulanmış durum

- [x] Marka: **XQNT Coin**
- [x] Sembol: **XQNT**
- [x] Açılım: **X Quantum Network Token**
- [x] Ana domain: **https://www.xqntcoin.com**
- [x] GitHub kaynak kodu açık
- [x] Website live / token pre-launch ayrımı yapıldı
- [x] Taslak toplam arz: **1.000.000.000 XQNT**
- [x] Taslak dağılım toplamı: **%100**
- [x] Satış, fiyat, DEX veya sahte kontrat adresi gösterilmiyor
- [ ] Ana lansman ağı seçilmedi
- [ ] Hukuki sınıflandırma tamamlanmadı
- [ ] Token kontratı yazılmadı
- [ ] Testnet dağıtımı yapılmadı
- [ ] Bağımsız güvenlik incelemesi yapılmadı
- [ ] Mainnet kontratı yayımlanmadı
- [ ] Likidite eklenmedi

## 1. Önce alınacak kararlar

Bu aşama tamamlanmadan kontrat yazılmamalıdır.

### 1.1 Birincil ülke ve işletmeci

Gerekli kararlar:

- Tokenı yayımlayacak kişi veya şirket hangi ülkede olacak?
- Website ve proje belgelerinde görünen işletmeci kim olacak?
- Token herhangi bir yatırım, kâr payı, gelir paylaşımı, geri alım veya sabit
  değer vaadi taşıyacak mı?
- Halka satış, ön satış, airdrop veya yalnızca topluluk dağıtımı mı yapılacak?
- Endonezya, AB, ABD veya başka ülke sakinlerine aktif pazarlama yapılacak mı?

En düşük riskli başlangıç:

- Ön satış yapmamak.
- Getiri, fiyat artışı veya gelir paylaşımı vaat etmemek.
- Tokenın gerçek kullanımını lansmandan önce açıkça tanımlamak.
- İşletmeci ve hazine sorumluluğunu yazılı hale getirmek.
- Hedef ülke için kısa bir “token classification / legal opinion” almak.

Endonezya notu: Kripto varlık ve dijital finansal varlık ticareti gözetimi
10 Ocak 2025’te Bappebti’den OJK’ye devredildi. POJK 27/2024 ve onu değiştiren
POJK 23/2025; lisanslı ticaret sağlayıcıları, listeleme, yönetişim, risk,
siber güvenlik, AML ve tüketici koruması konularını kapsar. Endonezya’da halka
aktif pazarlama, yerel platformda listeleme veya alım-satım hizmeti için yerel
hukuk görüşü alınmadan işlem yapılmamalıdır.

Geçiş koşulu:

- [ ] Birincil ülke yazıldı.
- [ ] İşletmeci gerçek kişi/şirket adı belirlendi.
- [ ] Satış ve dağıtım modeli yazıldı.
- [ ] Yerel hukuk görüşü alındı.

### 1.2 Ana ağ seçimi

Teknik olarak önerilen düşük maliyetli rota: **Base üzerinde ERC-20**.

Neden:

- Ethereum uyumlu standart ve araçlar kullanılır.
- Ethereum ana ağına göre çoğunlukla daha düşük işlem maliyeti hedefler.
- OpenZeppelin, Safe, Foundry, Wagmi ve Viem araçlarıyla uyumludur.
- Önce ücretsiz Base Sepolia testnet üzerinde denenebilir.

Alternatifler:

| Ağ | Artısı | Eksisi |
| --- | --- | --- |
| Base | Düşük maliyetli EVM rotası, güçlü araç desteği | Köprü ve L2 riskleri açıklanmalı |
| BNB Chain | Düşük ücret, geniş perakende kullanıcı kitlesi | BNB ekosistem bağımlılığı |
| Ethereum | En yerleşik EVM ağı | Mainnet dağıtım ve işlem maliyeti yüksek olabilir |

Birden fazla ağda aynı anda token çıkarmak ilk sürüm için önerilmez. Köprü,
çift arz ve operasyon riski doğurur.

Geçiş koşulu:

- [ ] Tek bir ana ağ seçildi.
- [ ] Testnet ve mainnet explorer bağlantıları kaydedildi.
- [ ] RPC sağlayıcısı ve yedek RPC seçildi.

### 1.3 Token özellikleri

Önerilen sade ve denetlenebilir başlangıç:

| Özellik | Öneri |
| --- | --- |
| Ad | XQNT Coin |
| Sembol | XQNT |
| Standart | ERC-20 |
| Arz | Sabit 1.000.000.000 XQNT |
| Ondalık | 18 |
| Sonradan mint | Yok |
| Transfer vergisi | Yok |
| Gizli blacklist | Yok |
| Upgradeable proxy | İlk sürümde yok |
| Pause yetkisi | Hukuki/güvenlik kararı sonrası |
| Burn | Kullanıcıların kendi tokenını yakması opsiyonel |

Sadelik güveni ve denetlenebilirliği artırır. Transfer vergisi, sınırsız mint,
blacklist, keyfi bakiye değiştirme veya sahibin transferleri durdurabilmesi gibi
özellikler hem güvenlik hem de itibar riskini yükseltir.

Geçiş koşulu:

- [ ] Yukarıdaki özellikler yazılı olarak onaylandı.
- [ ] Tokenın gerçek kullanım amacı tek paragrafta açıklandı.
- [ ] Hangi yetkilerin kontratta bulunacağı açıklandı.

## 2. Kurumsal ve operasyonel hazırlık

Gerekli minimum yapı:

- İşletmeci kişi/şirket kaydı.
- Projeye ait banka ve muhasebe düzeni.
- Domain sahipliği ve yenileme koruması.
- Çalışan `support@xqntcoin.com` posta kutusu.
- MX, SPF, DKIM ve DMARC kayıtları.
- En az 3 ayrı güvenilir imzalayan ile **2/3 Safe multisig**.
- Donanım cüzdanları veya güvenli ayrı imza cihazları.
- Hazine, likidite, ekip ve rezerv için ayrı adresler.
- Adres sahipliği ve amacı gösteren kamuya açık adres tablosu.
- Seed phrase ve private keylerin hiçbir zaman GitHub, e-posta veya mesajla
  paylaşılmaması.

Geçiş koşulu:

- [ ] Multisig oluşturuldu ve test edildi.
- [ ] İmzalayanlar aynı cihazda veya aynı kişide değil.
- [ ] Hazine adresleri ve sorumluları kaydedildi.
- [ ] Destek e-postası DNS doğrulamasını geçti.

## 3. Tokenomics ve vesting

Website üzerindeki mevcut taslak:

| Bölüm | Pay | Önerilen kontrol |
| --- | ---: | --- |
| Topluluk ödülleri | %40 | Kampanya kuralları + multisig |
| Likidite ve ekosistem | %20 | Ayrı multisig, LP politikası |
| Geliştirme ve hazine | %20 | Bütçe ve harcama raporu |
| Ekip | %15 | On-chain vesting |
| Rezerv | %5 | Kullanım koşulu + multisig |

Toplam: **%100**

Lansmandan önce yayımlanması gerekenler:

- Her tahsisatın cüzdan adresi.
- Ekip için cliff ve vesting takvimi.
- Topluluk dağıtım kriterleri.
- Rezervin hangi koşullarda kullanılabileceği.
- Likiditenin kim tarafından ve ne kadar süreyle yönetileceği.
- Tokenların hangi tarihte dolaşıma gireceği.

Önerilen ekip planı: 12 ay cliff ve ardından 24–36 ay doğrusal vesting. Bu
süreler hukuki ve ticari inceleme sonrası kesinleştirilir.

Geçiş koşulu:

- [ ] Tüm tahsisatlar adres ve takvimle eşleştirildi.
- [ ] Vesting kontratları test edildi.
- [ ] İlk gün dolaşım miktarı yayımlandı.

## 4. Kontrat geliştirme

Teknik temel:

- Solidity’nin güncel kararlı sürümü.
- ERC-20 standardı.
- OpenZeppelin Contracts’ın kararlı/audit edilmiş sürümü.
- Foundry ile test ve deployment scriptleri.
- Tekrarlanabilir, kaynak koddan doğrulanabilir build.
- Mainnet ile aynı ayarlarda testnet prova dağıtımı.

Zorunlu otomatik testler:

- Toplam arz tam olarak 1 milyar.
- Arz yalnızca beklenen adrese bir kez basılıyor.
- Yetkisiz mint mümkün değil.
- Transfer ve allowance davranışı ERC-20 ile uyumlu.
- Sıfır adres ve sınır değer senaryoları.
- Varsa pause/burn/permit yetkileri.
- Vesting zaman hesapları.
- Deployment sonrası rol ve ownership durumu.

Geçiş koşulu:

- [ ] Kod GitHub’da açık.
- [ ] Tüm testler geçiyor.
- [ ] Testnet kontratı explorer’da doğrulandı.
- [ ] Deployment scripti kuru prova ile tekrarlandı.

## 5. Güvenlik incelemesi

Mainnet öncesi:

- En az bir bağımsız akıllı kontrat incelemesi.
- Kritik bulguların kapatılması.
- Deployment parametrelerinin ikinci kişi tarafından kontrolü.
- Multisig imzalayanlarının test işlemi yapması.
- Website, DNS, GitHub ve sosyal hesaplarda 2FA.
- Oltalama ve sahte kontrat müdahale planı.
- Kontrat adresinin yalnızca resmi domain, GitHub ve explorer üzerinden
  yayımlanması.

Karmaşık özellikler veya yüksek likidite varsa profesyonel audit zorunlu bütçe
kalemi kabul edilmelidir. “Audit yapıldı” ifadesi rapor ve commit hash’i olmadan
kullanılmamalıdır.

Geçiş koşulu:

- [ ] Audit/inceleme raporu yayımlandı.
- [ ] Raporun incelediği commit hash’i mainnet koduyla aynı.
- [ ] Kritik ve yüksek bulgu açık değil.
- [ ] Olay müdahale sorumluları belirlendi.

## 6. Mainnet dağıtımı

Sıra:

1. Son kaynak commit’i etiketle.
2. Derleyici, optimizer ve constructor parametrelerini kaydet.
3. Deployment cüzdanına yalnızca gerekli gas miktarını gönder.
4. Kontratı multisig kontrollü dağıtım akışıyla yayımla.
5. Explorer üzerinde kaynak kodu doğrula.
6. Toplam arzı ve dağıtım işlemlerini kontrol et.
7. Gerekli rolleri multisig’e devret veya gereksiz yetkileri kaldır.
8. Explorer, website, GitHub ve güvenlik sayfasına aynı adresi ekle.
9. En az iki kişi adresi karakter karakter doğrulasın.

Geçiş koşulu:

- [ ] Kontrat explorer’da doğrulandı.
- [ ] Website ve GitHub aynı kontrat adresini gösteriyor.
- [ ] Yetkiler ve toplam arz bağımsız kontrol edildi.
- [ ] Sahte kontrat uyarısı yayımlandı.

## 7. Likidite ve piyasa açılışı

Likidite eklemek token çıkarmaktan ayrı bir mali ve hukuki karardır.

Önce belirlenmesi gerekenler:

- Kullanılacak DEX ve işlem çifti.
- Başlangıç token miktarı ve karşı varlık bütçesi.
- Başlangıç fiyatının nasıl oluşacağı.
- LP tokenlarının kilit, yakım veya multisig yönetim modeli.
- Fiyat oynaklığı ve likidite kaybı açıklamaları.
- Market maker kullanılacaksa sözleşme ve yetkileri.

Ucuz ve kontrollü rota:

- Ön satış yapmadan testnet ve topluluk hazırlığını tamamlamak.
- Tek ağ ve tek resmi işlem çiftiyle başlamak.
- Sahte “garantili fiyat” veya “garantili getiri” söylemi kullanmamak.
- Likidite kanıtını ve LP yönetimini zincir üzerinde yayımlamak.

Geçiş koşulu:

- [ ] Hukuki onay mevcut.
- [ ] Likidite bütçesi kaynağı belgeli.
- [ ] LP yönetim politikası yayımlandı.
- [ ] Risk bildirimi güncellendi.

## 8. Listeleme, metadata ve görünürlük

Mainnet adresi doğrulandıktan sonra:

- Explorer token bilgileri ve logo başvurusu.
- Wallet token listeleri.
- DEX analytics sayfaları.
- CoinGecko/CoinMarketCap gibi platformların resmi başvuruları.
- GitHub release ve deployment kaydı.
- Resmi X/Telegram/Discord hesapları açılacaksa 2FA ve moderasyon politikası.

Ücret karşılığı “garantili listeleme”, sahte hacim ve bot yorum hizmetlerinden
kaçınılmalıdır.

## 9. Lansman iletişimi

Yayımlanacak tek doğrulanmış lansman paketi:

- Kontrat adresi ve explorer bağlantısı.
- Ağ adı ve chain ID.
- Toplam arz ve dolaşım miktarı.
- Tokenomics ve vesting adresleri.
- Audit raporu.
- Multisig adresi.
- Resmi DEX çifti.
- Risk bildirimi.
- “Seed phrase/private key istemeyiz” uyarısı.

Website üzerinde kontrat adresi kopyalama alanı eklenmeden önce iki kişilik
doğrulama yapılmalıdır.

## 10. Lansman sonrası operasyon

- Hazine ve vesting hareketlerinin düzenli raporu.
- Multisig imzalayanlarının periyodik erişim kontrolü.
- Domain, e-posta ve sosyal hesap yenileme takibi.
- Kontrat ve frontend izleme/uyarı sistemi.
- Güvenlik açığı bildirim kanalı.
- Vergi ve muhasebe kayıtları.
- Düzenleyici değişikliklerin periyodik kontrolü.
- Tokenın kullanımının vaat edilen amaçla uyumlu olup olmadığının raporlanması.

## Minimum maliyet kalemleri

Fiyatlar ülke, ağ, audit kapsamı ve likidite kararına göre değişir. Bütçede
ayrı ayrı bulunması gereken kalemler:

1. Şirket/hukuk ve token sınıflandırması.
2. Muhasebe ve vergi.
3. Kontrat geliştirme ve bağımsız inceleme.
4. Mainnet gas.
5. Multisig/donanım cüzdan güvenliği.
6. Likidite için kullanılacak karşı varlık.
7. Domain, kurumsal e-posta ve operasyon.
8. İzleme, olay müdahalesi ve gerektiğinde profesyonel audit.

Testnet kullanımı, sade sabit arzlı kontrat, tek ağ, ön satışsız lansman ve
minimum özel özellik geliştirme maliyetini düşürür. Audit ve hukuki inceleme
“ucuzlatmak için çıkarılacak” kalemler değildir.

## Bizim sıradaki çalışma adımımız

Önce **Aşama 1: kararları donduracağız**. Aşağıdaki beş madde onaylanmadan
kontrat koduna başlamayacağız:

1. Birincil işletmeci ülkesi.
2. Ana ağ: öneri **Base**.
3. Satış modeli: öneri **ön satış yok**.
4. Kontrat modeli: öneri **sabit arz, mint yok, transfer vergisi yok,
   upgrade yok**.
5. Hazine: öneri **2/3 Safe multisig**.

Bu kararlar verildiğinde bir sonraki teslimat:

- `XQNTToken.sol`
- Foundry test paketi
- Base Sepolia deployment scripti
- Tokenomics adres planı
- Testnet explorer doğrulaması

olacaktır. Mainnet dağıtımı ayrıca ve açık onayla yapılır.

## Resmi kaynaklar

- [ERC-20 standardı — EIP-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin ERC-20 belgeleri](https://docs.openzeppelin.com/contracts/5.x/erc20)
- [Base kontrat dağıtım belgeleri](https://docs.base.org/get-started/deploy-smart-contracts)
- [Safe smart account belgeleri](https://docs.safe.global/home/what-is-safe)
- [FATF — Virtual Assets ve VASP standartları](https://www.fatf-gafi.org/en/publications/Virtualassets/Virtual-assets-fatf-standards.html)
- [Endonezya OJK — POJK 27/2024 duyurusu](https://www.ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Documents/Pages/POJK-27-Tahun-2024-Penyelenggaraan-Perdagangan-Aset-Keuangan-Digital-Termasuk-Aset-Kripto-AKD-AK/SP%20210%20-%20Siaran%20Pers%20POJK%2027%20Tahun%202024%20tentang%20AKD%20AK.pdf)
- [Endonezya OJK — POJK 23/2025 değişikliği](https://iru.ojk.go.id/iru/WebSite/ArticleList/View/977_OJK_Regulation_Number_23_2025_concerning_Amendment_to_POJK_27_2024_concerning_Provision_of_Trading_of_Digital_Financial_Assets_Including_Crypto_Assets)
- [AB MiCA — Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj)
- [ABD SEC — 2026 kripto varlık rehberi](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/crypto-assets-federal-securities-laws)
