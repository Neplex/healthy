export class Bounds {

    constructor(
        public min_lat: number = -Infinity,
        public max_lat: number = Infinity,
        public min_lng: number = -Infinity,
        public max_lng: number = Infinity) {
    }

    static fromCenter(lat: number, lng: number, lat_bounds: number, lng_bounds: number) {
        return new this(
            lat - lat_bounds,
            lat + lat_bounds,
            lng - lng_bounds,
            lng + lng_bounds
        );
    }

    public getLatBounds(): [number, number] {
        return [this.min_lat, this.max_lat];
    }

    public getLngBounds(): [number, number] {
        return [this.min_lng, this.max_lng];
    }

    public getBounds(): [[number, number], [number, number]] {
        return [this.getLatBounds(), this.getLngBounds()];
    }
}
