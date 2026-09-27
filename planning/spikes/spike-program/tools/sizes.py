"""Report size of a publish output: raw, gzip -9 and brotli (q11) totals for the files a server would send.
Usage: python3 tools/sizes.py out/<variant>/wwwroot"""
import gzip, os, sys, json
import brotli

root = sys.argv[1]
rows = []
for d, _, fs in os.walk(root):
    for f in fs:
        if f.endswith(('.gz', '.br')):
            continue  # precompressed siblings; we compress ourselves
        p = os.path.join(d, f)
        data = open(p, 'rb').read()
        rows.append((os.path.relpath(p, root), len(data), len(gzip.compress(data, 9)), len(brotli.compress(data, quality=11))))
fw = [r for r in rows if r[0].startswith('_framework')]
def tot(rs): return [len(rs), sum(r[1] for r in rs), sum(r[2] for r in rs), sum(r[3] for r in rs)]
out = {"wwwroot": tot(rows), "_framework": tot(fw),
       "top10": sorted(rows, key=lambda r: -r[1])[:10]}
for k in ("wwwroot", "_framework"):
    n, raw, gz, br = out[k]
    print(f"{k}: {n} files, raw {raw/1e6:.2f} MB, gzip-9 {gz/1e6:.2f} MB, brotli {br/1e6:.2f} MB")
print("10 largest (raw / gzip / br bytes):")
for r in out["top10"]:
    print(f"  {r[0]:70s} {r[1]:>10,} {r[2]:>10,} {r[3]:>10,}")
json.dump(out, open(os.path.join(os.path.dirname(root.rstrip('/')), 'sizes.json'), 'w'), indent=1)
