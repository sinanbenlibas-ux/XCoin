# XQNT Base Lansman Runbook

## Şu anki durum

Kod, test ve güvenlik araçları hazırlanmıştır. XQNT mainnet’te henüz
dağıtılmamıştır. Resmî kontrat, havuz veya satış yoktur.

## Değişmeyen teknik model

- Ağ: Base, chain ID `8453`
- Token: `XQNT Coin (XQNT)`, 18 decimals
- Toplam arz: `1.000.000.000 XQNT`
- Sonradan mint, owner, pause, blacklist, vergi, permit, proxy ve upgrade: yok
- DEX: Uniswap v3, `XQNT/USDC`, yüzde `0,30` fee
- Başlangıç: `100.000.000 XQNT + 1.000 USDC`
- Referans oran: `0,00001 USDC/XQNT`; garanti veya değerleme değildir
- LP NFT sahibi: 2/3 Liquidity Safe; yakılmış/kilitli değildir ve çekilebilir

## Mainnet kilitleri

Aşağıdaki satırların tamamı kanıtla kapanmadan mainnet komutu çalıştırılmaz:

- [ ] Endonezya tüzel kişiliği kuruldu ve gerçek şirket bilgileri sağlandı
- [ ] OJK kapsamı, global duyuru, DEX likiditesi, tüketici açıklamaları ve vergi
      hakkında yazılı hukuk görüşü alındı
- [ ] Aynı üç bağımsız imzalayanla beş adet Base 2/3 Safe kuruldu
- [ ] Üç imzalayan Base Sepolia kurtarma ve işlem provasını tamamladı
- [ ] Base Sepolia token, vesting, dağıtım ve mock USDC havuz provası tamamlandı
- [ ] Bağımsız Solidity uzmanı belirli commit’i inceledi; kritik/yüksek bulgu yok
- [ ] İnceleme raporu ve SHA-256 özeti yayımlandı
- [ ] Mainnet release tag’i ve exact source commit belirlendi
- [ ] 1.000 USDC ve yeterli Base ETH hazır
- [ ] Kontrat, vesting, Safe ve altyapı adresleri iki kişi tarafından doğrulandı

## Yerel doğrulama

```bash
forge build --root contracts
forge test --root contracts -vv
node scripts/check-contract-surface.mjs
npm run lint
npm test
npm run build
```

Derleyici `0.8.36`, optimizer `200`, EVM `cancun`, OpenZeppelin `5.6.1` olarak
`contracts/foundry.toml` ve git submodule commit’leriyle sabitlenmiştir.

## Base Sepolia prova sırası

1. [Safe rehberindeki](./SAFE-KURULUM-VE-PROVA-TR.md) beş Safe’i kurun.
2. Public adresleri yerel `.env.local` içine girin. Treasury Safe aynı zamanda
   ilk 1 milyar tokenı alan Distribution Safe olarak kullanılmalıdır.
3. Ayrı deployer cüzdanını yalnızca testnet ETH ile fonlayın.
4. Cüzdan hesabını Foundry keystore veya donanım cüzdanıyla kullanın. Raw private
   key’i komut satırına, `.env` dosyasına veya GitHub’a koymayın.
5. Test mock USDC’yi Liquidity Safe’e dağıtın:

```bash
forge script contracts/script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url base_sepolia --account <yerel-keystore-adi> --broadcast
```

6. `MOCK_USDC` adresini kaydedin. Lansman timestamp’ini ve Safe adreslerini
   kontrol ederek token + vesting kontratlarını dağıtın:

```bash
forge script contracts/script/DeployXQNT.s.sol:DeployXQNT \
  --rpc-url base_sepolia --account <yerel-keystore-adi> --broadcast
```

7. Token ve vesting kaynaklarını BaseScan/Sourcify üzerinde doğrulayın.
8. Token/vesting adresleri ile 24 saat içinde geçerli bir
   `LIQUIDITY_DEADLINE` belirleyin ve batch üretin:

```bash
CHAIN_ID=84532 npm run launch:safe-batches
```

9. `contracts/deployments/generated/` JSON dosyalarını Safe Transaction
   Builder’a aktarın. Her adresi manifest ile karşılaştırın, simulation yapın,
   sonra 2/3 imza ile çalıştırın.
10. Tahsisatları, vesting bakiyesini, havuz oranını, LP NFT sahibini ve
    sıfırlanmış allowance değerlerini explorer üzerinden doğrulayın.
11. `contracts/deployments/base-sepolia.json` manifestini işlem hash’leriyle
    commit edin.

## Tahsisatlar

| Hedef | XQNT | Pay |
|---|---:|---:|
| Community Safe | 400.000.000 | %40 |
| Liquidity Safe | 200.000.000 | %20 |
| Treasury Safe | 200.000.000 | %20 |
| Team vesting | 150.000.000 | %15 |
| Reserve Safe | 50.000.000 | %5 |
| Toplam | 1.000.000.000 | %100 |

Liquidity Safe’in 200 milyon bakiyesinin 100 milyonu ilk havuzda kullanılır.

## Bağımsız inceleme paketi

İncelemeciye release candidate commit’i, `contracts/` kaynakları, compiler
ayarları, test çıktıları, ABI yüzey kontrolü, Safe modeli, vesting matematiği ve
Base Sepolia manifesti verilir. Nihai rapor commit hash’ini açıkça yazmalı ve
kritik/yüksek bulgular kapatılmalıdır.

## Mainnet uygulaması

Mainnet işlemleri yalnızca kilitler kapandıktan ve kullanıcı kendi cüzdanında
onay vermeye hazırken yapılır:

1. Release tag’ini checkout edin; temiz çalışma ağacını ve submodule commit’lerini
   doğrulayın.
2. Bytecode’u testnet release candidate ile karşılaştırın.
3. Public adresleri, kanıt digestlerini ve exact
   `XQNT_MAINNET_ACK=LEGAL_SAFE_AUDIT_VERIFIED` değerini yerel ortama girin.
4. Ayrı deployer’a yalnızca tahmini gas kadar Base ETH aktarın.
5. Token + vesting deploy işlemini cüzdan ekranında chain ID, constructor ve
   adreslerle karşılaştırarak onaylayın.
6. BaseScan ve Sourcify doğrulamasını tamamlayın.
7. Safe tahsis batch’ini simulate edin ve 2/3 ile çalıştırın; toplam arzı tekrar
   hesaplayın.
8. Batch aracı mevcut yüzde 0,30 havuzu RPC ile kontrol eder. Daha önce
   initialize edilmiş havuz varsa **durun**; başka havuza otomatik geçmeyin.
9. Likidite batch’inde oran, min miktarlar, deadline, LP alıcısı ve allowance
   sıfırlamalarını kontrol ederek 2/3 imzalayın.
10. LP NFT’nin Liquidity Safe’e ait ve allowance’ların sıfır olduğunu doğrulayın.
11. İki kişi tüm adresleri doğruladıktan sonra manifest, BaseScan, GitHub ve
    `app/launch-config.ts` aynı commit’te güncellenir.
12. Site ancak bütün release check’leri doğru ve adresler doluysa `Token live on
    Base` ve `Verified holder` gösterebilir.

## İlk 24 saat

Kontrat ve Safe transferleri, Uniswap havuzu/LP NFT’si, web/API hataları ve sahte
kontrat bildirimleri izlenir. Token immutable olduğu için acil durumda kontrat
değiştirilmeye çalışılmaz; yeni likidite/treasury işlemleri durdurulur ve resmî
kanallardan teknik durum açıklanır.
