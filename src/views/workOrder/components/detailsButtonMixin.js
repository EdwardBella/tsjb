import * as mixins from "@/utils/mixins";

export default {
  mixins: [mixins.affirm],
  props: {
    details: { type: Object, default: Object },
    rePlayLoadData: { type: Function, default: Function },
  },
};
