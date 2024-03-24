import Icon from '@/shared/assets/accessibility.svg';

import styles from './Widget.module.css';

interface WidgetProps {
  /**
   * Test prop
   */
  test?: string;
}

/**
 * Test widget
 * @param props
 */

export const Widget = ({ test = 'test' }: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <Icon />
      {test}
    </div>
  );
};
