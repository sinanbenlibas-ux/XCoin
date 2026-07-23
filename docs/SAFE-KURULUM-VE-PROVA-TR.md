# XQNT 2/3 Safe Kurulum ve Prova Rehberi

Bu belge anahtar üretmez, seed phrase toplamaz ve işlem imzalamaz. Üç imzalayan
kişinin her biri kendi cihazını ve kurtarma bilgisini bağımsız yönetmelidir.

## Kurulacak hesaplar

Aynı üç bağımsız imzalayan ve `2/3` eşik ile Base Sepolia üzerinde önce şu beş
Safe kurulacaktır:

1. Community Safe
2. Liquidity Safe
3. Treasury / Distribution Safe
4. Team Safe
5. Reserve Safe

Mainnet Safe hesapları testnet provasından sonra Base üzerinde ayrıca
oluşturulur. Testnet ve mainnet adreslerinin aynı olacağı varsayılmamalıdır.

## İmzalayan hazırlığı

- Her imzalayan farklı bir kişi ve mümkünse farklı fiziksel konum olmalıdır.
- Her kişi ayrı donanım cüzdanı veya yalnızca bu görev için ayrılmış cihaz
  kullanmalıdır.
- Seed phrase çevrimdışı saklanır; fotoğrafı çekilmez, buluta yüklenmez, GitHub,
  Vercel, Codex, e-posta veya mesajlaşmaya yazılmaz.
- Site ve belgelerde yalnızca public adres paylaşılır.
- Üç adres iki kişi tarafından karakter karakter ve checksum ile doğrulanır.
- İmzalayan görevi, kayıp/ayrılma prosedürü ve Safe değişikliği şirket kararıyla
  yazılı hale getirilir.

## Base Sepolia kurulumu

1. Yalnızca [app.safe.global](https://app.safe.global/) adresini açın.
2. Ağı `Base Sepolia` seçin.
3. Safe adını ve üç public imzalayan adresini girin.
4. Eşiği `2 of 3` seçin.
5. Oluşturma işlemini cüzdanınızda kontrol ederek onaylayın.
6. Safe adresi, oluşturma işlem hash’i, sahipler ve eşik değerini manifest
   çalışma kağıdına kaydedin.
7. Aynı işlemi beş hesap için tekrarlayın.

## Zorunlu prova

Her Safe için:

- küçük bir test ETH yatırın;
- imzalayan A işlemi oluştursun, B onaylasın ve çalıştırsın;
- ikinci işlemde B oluştursun, C onaylasın;
- üçüncü senaryoda A erişilemezken B+C ile işlemin tamamlandığını doğrulayın;
- yanlış alıcı adresli bir işlemi çalıştırmadan reddetme provasını yapın;
- Safe Transaction Builder JSON import ve simulation sonucunu üç kişi okuyun;
- sahipler ve threshold bilgisini BaseScan üzerinden tekrar doğrulayın.

## Kurtarma provası

Gerçek seed phrase paylaşmadan, her imzalayan kendi kurtarma yedeğini bağımsız
olarak boş/yedek cihazda test eder. Bir imzalayan kalıcı olarak kaybolursa kalan
iki imzalayan yeni bir üçüncü imzalayan ekleyebilir; bu değişiklik şirket
kayıtlarına ve kamuya açık Safe açıklamasına işlenmelidir.

## Mainnet öncesi kabul kaydı

Her Safe için aşağıdaki kayıt tamamlanmadan ilerlemeyin:

```text
Safe adı:
Base mainnet adresi:
Signer 1 public adresi:
Signer 2 public adresi:
Signer 3 public adresi:
Threshold: 2/3
Doğrulayan kişi 1 / tarih:
Doğrulayan kişi 2 / tarih:
Safe UI kontrolü:
BaseScan kontrolü:
```

Liquidity Safe’in Uniswap LP NFT’sini kontrol edeceği ve iki imza ile
likiditenin geri çekilebileceği açıkça kabul edilmelidir.
